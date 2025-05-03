
# Show help
help:
    @just --list

# Start a development envidonment
[group('development')]
up:
    @bun install
    @docker compose up -d

# Stop comtainers
[group('development')]
down:
    @docker compose stop

# Migrate database
[group('development')]
migrate-make name:
    @docker compose exec app \
      bun run migrate:make -- {{name}}

# Migrate database
[group('development')]
migrate-run:
    @docker compose exec app \
        bun run migrate:run

# Shows outdated packages
[group('packages')]
outdated:
    @ bun outdated

# Upgrade outdated packages
[group('packages')]
upgrade:
    @bun update

# Build for production
[group('production')]
build: 
    @bun run build


