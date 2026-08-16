{
  description = "ssh-website — a Wish-based public SSH endpoint that greets whoever connects";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      # Systems where this package is buildable. VPS deploys x86_64-linux;
      # devShell on the mac needs aarch64-darwin. Keep both.
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];

      forAllSystems =
        f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs { inherit system; }));
    in
    {
      packages = forAllSystems (pkgs: {
        default = self.packages.${pkgs.stdenv.hostPlatform.system}.ssh-website;

        ssh-website = pkgs.buildGoModule {
          pname = "ssh-website";
          version = "0.1.0";

          # Vendor the Go module dependencies straight from ./go.sum. When
          # go.sum changes, replace `vendorHash` with `pkgs.lib.fakeHash`,
          # rebuild once, and paste the "got: sha256-..." line Nix prints
          # into this field.
          src = ./.;
          vendorHash = "sha256-6NokIvi5lJIcqEg6K7WGXuu6n0WTCiSB4gaK/0gbEOY=";

          # The binary name — this is what winds up at $out/bin/<name>.
          # Matches the NixOS module's ExecStart in
          # hosts/vps-netcup/ssh-website.nix.
          subPackages = [ "." ];

          # skip the standard Go test phase since there aren't any tests.
          doCheck = false;

          # `-s -w` strips DWARF + symbol tables (about a 30% size cut).
          # -trimpath removes local build paths from the binary so it's
          # reproducible across machines.
          ldflags = [
            "-s"
            "-w"
          ];

          meta = with pkgs.lib; {
            description = "Public SSH endpoint that greets whoever connects (charmbracelet/wish)";
            homepage = "https://github.com/habetuz/habetuz/tree/ssh";
            license = licenses.mit;
            mainProgram = "ssh";
            platforms = platforms.unix;
          };
        };
      });

      # Standalone dev shell for anyone who does not want devenv.sh. Same
      # tooling as ./devenv.nix — kept in sync manually.
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [
            pkgs.go
            pkgs.gopls
            pkgs.gotools
            pkgs.go-tools
          ];
        };
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt-rfc-style);
    };
}
