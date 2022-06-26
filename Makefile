APP_SCHEMA := what_to_eat
APP_DBURL := postgres://postgres:postgres@db/postgres?sslmode=disable

.PHONY: setup-db
setup-db:
	docker-compose up -d db
	sleep 10
	@docker-compose run db psql ${APP_DBURL} \
		-c "CREATE SCHEMA IF NOT EXISTS ${APP_SCHEMA};"

.PHONY: build-backend-image
build-backend-image:
	docker build -t what-to-eat-backend -f ./Dockerfile.backend .
