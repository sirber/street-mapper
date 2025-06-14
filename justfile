
# Show help
help:
    @just --list

# Start a development envidonment
[group('development')]
up:
    @docker compose up -d --wait
    @docker compose exec -t app sh -c "chmod +w ./migrations/*"
    @open http://localhost:5000

# Get bash inside the container
[group('development')]
cli:
    @docker compose exec -ti app sh

# Get bash inside the container
[group('development')]
test:
    @docker compose exec -t app bun run test

# Stop comtainers
[group('development')]
down:
    @docker compose down

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
    @docker compose exec app \
        bun outdated

# Upgrade outdated packages
[group('packages')]
update:
    @docker compose exec app \
        bun update

# Build for production
[group('production')]
build:
    @docker compose exec app \
    bun run build
