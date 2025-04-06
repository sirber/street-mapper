
# Show help
help:
    @just --list

# Start a development envidonment
dev:
    @cd server && bun install
    @cd client && bun install
    @docker compose up -d

# Shows outdated packages
outdated:
    @echo "Server"
    @cd server && bun outdated
    @echo "Client"
    @cd client && bun outdated

# Upgrade outdated packages
upgrade:
    @echo "Server"
    @cd server && bun update
    @echo "Client"
    @cd client && bun update

# Build the server code
build-server:
  @cd server && bun build ./src/index.ts --minify --targte=bun --outfile=../dist/server.js

# Build the client code
build-client:
  @cd client && bun run build --outdir ../dist/client/

# Build both server and client
build: build-server build-client
