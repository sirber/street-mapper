
# Show help
help:
    @just --list

# Start a development envidonment
dev:
    @echo "Server packages"
    @cd server && bun install
    @echo "Client packages"
    @cd client && bun install
    @echo "Starting containers..."
    @docker compose up -d

# Shows outdated packages
outdated:
    @echo "Server packages"
    @cd server && bun outdated
    @echo "Client packages"
    @cd client && bun outdated

# Upgrade outdated packages
upgrade:
    @echo "Server packages"
    @cd server && bun update
    @echo "Client packages"
    @cd client && bun update

# Build the server code
build-server:
  @echo "Building server..."
  @cd server && bun build ./src/index.ts --minify --targte=bun --outfile=../dist/server.js

# Build the client code
build-client:
  @echo "Building client..."
  @cd client && bun run build --outdir ../dist/client/

# Build both server and client
build: build-server build-client
