// ssh-website — public SSH endpoint that greets whoever connects.
//
// This is the process that listens on TCP/22 on vps-netcup. It is a
// dedicated SSH implementation (charmbracelet/wish) and NOT OpenSSH —
// admin sshd lives on port 2222 with its own host key.
//
// Deliberate feature-strip: no shell exec, no SFTP, no port forwarding,
// no X11, no agent forwarding. Public-key auth is enabled but every key
// is accepted; auth only exists because the SSH protocol requires it.
//
// Config surface (env vars, all optional):
//
//	SSH_WEBSITE_ADDR      listen address (default "0.0.0.0:22")
//	SSH_WEBSITE_HOST_KEY  path to persistent ed25519 host key
//	                     (default "/var/lib/ssh-website/host_ed25519").
//	                     Wish generates the key on first run if missing.
package main

import (
	"context"
	"errors"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/logging"
)

func main() {
	addr := envOr("SSH_WEBSITE_ADDR", net.JoinHostPort("0.0.0.0", "22"))
	hostKey := envOr("SSH_WEBSITE_HOST_KEY", "/var/lib/ssh-website/host_ed25519")

	s, err := wish.NewServer(
		wish.WithAddress(addr),
		wish.WithHostKeyPath(hostKey),
		// Accept any public key. The point is public reachability;
		// auth is required by the SSH protocol but semantically open.
		wish.WithPublicKeyAuth(func(_ ssh.Context, _ ssh.PublicKey) bool { return true }),
		wish.WithMiddleware(
			helloMiddleware(),
			logging.Middleware(),
		),
	)
	if err != nil {
		slog.Error("build server", "err", err)
		os.Exit(1)
	}

	// Keep connections short — this is a greeting, not a session.
	s.IdleTimeout = 30 * time.Second
	s.MaxTimeout = 60 * time.Second

	slog.Info("listening", "addr", addr, "host_key", hostKey)

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGTERM)

	go func() {
		if err := s.ListenAndServe(); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
			slog.Error("serve", "err", err)
			done <- syscall.SIGTERM
		}
	}()

	<-done
	slog.Info("shutting down")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
		slog.Error("shutdown", "err", err)
		os.Exit(1)
	}
}

func envOr(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

// helloMiddleware writes "Hello, <user>!" then hands control to the next
// middleware (logging.Middleware), which closes the session cleanly.
func helloMiddleware() wish.Middleware {
	return func(next ssh.Handler) ssh.Handler {
		return func(sess ssh.Session) {
			user := sess.User()
			if user == "" {
				user = "stranger"
			}
			wish.Println(sess, "Hello,", user+"!")
			next(sess)
		}
	}
}
