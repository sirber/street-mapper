
# Show help
help:
    @just --list

# Start a development envidonment
dev:
    @bun install
    @docker compose up -d

# Shows outdated packages
outdated:
    @ bun outdated

# Upgrade outdated packages
upgrade:
    @bun update

# Build 
build: 
    @bun run build

# Stop comtainers
stop:
    @docker compose stop
