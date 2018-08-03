# Node Express Starter

Starter application with user registration and login.

Run client and server unit tests with `./gradlew test`.

Run end-to-end tests with Protractor using `./gradlew e2e.`

Build a production-ready Docker image with `./gradlew dockerBuildImage`.

NOTE: dotenv is used to load properties depending on build environment. DO NOT COMMIT PRODUCTION SECRETS!!! .env.prod is checked in to this repo as an example.

Tech stack:
- Typescript
- Node + Express
- React
- MongoDB
- Gradle
- Yarn
- Protractor
- Docker + Compose