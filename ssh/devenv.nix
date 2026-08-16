{ pkgs, ... }:
{
  # devenv.sh dev shell for the ssh-website Go project. Enter with `devenv shell`
  # (or via direnv). Kept intentionally minimal — Wish is a pure-Go dep, no
  # C toolchain or system libraries needed.
  #
  # If you add tooling here, also update `devShells.default` in ./flake.nix so
  # anyone entering the shell via plain `nix develop` gets the same environment.

  languages.go = {
    enable = true;
    # No explicit `package =` — devenv picks a recent stable Go from nixpkgs.
    # Bump this side by side with go.mod's `go` directive if you pin a version.
  };

  packages = with pkgs; [
    gopls # Go language server (editor integration)
    gotools # goimports, guru, ...
    go-tools # staticcheck
    nixfmt-rfc-style # `nix fmt` on flake.nix / devenv.nix
  ];

  # Sanity check on entry so a stale shell surfaces immediately.
  enterShell = ''
    echo "ssh-website dev shell ready — $(go version)"
  '';

  # Run this to build the release binary in-tree (matches the flake output).
  scripts.build.exec = ''
    go build -trimpath -ldflags "-s -w" -o ./ssh .
  '';

  scripts.run.exec = ''
    # Local run: bind to 2200 (non-privileged) and keep the host key in $PWD.
    SSH_WEBSITE_ADDR="127.0.0.1:2200" \
    SSH_WEBSITE_HOST_KEY="$PWD/.dev_host_ed25519" \
      go run .
  '';
}
