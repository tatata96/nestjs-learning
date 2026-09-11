# nestjs-learning

A small NestJS learning project focused on the fundamentals.

This is not a production app. It is a practice project for understanding how the main NestJS building blocks fit together in a simple REST API.

## What this covers

- Modules and controllers
- Services and dependency injection
- DTOs and validation pipes
- Middleware with an API key check
- Guards for route-level authorization
- Interceptors for response transformation
- Unit tests with Vitest
- Basic CRUD-style routes using in-memory data

## Tech stack

- NestJS
- TypeScript
- Vitest
- Oxlint
- Prettier

## Project setup

```bash
npm install
```

## Run the project

```bash
npm run start
```

For development with watch mode:

```bash
npm run start:dev
```

The app runs on `http://localhost:3000` by default.

## API basics

User routes are protected by the API key middleware. Include this header:

```bash
x-api-key: secret-key-123
```

Available routes:

```text
GET    /user
GET    /user?name=Tamara
GET    /user/:id
POST   /user
PUT    /user/:id
DELETE /user/:id
```

The `DELETE /user/:id` route also uses a role guard. Include:

```bash
role: admin
```

Example request:

```bash
curl -H "x-api-key: secret-key-123" http://localhost:3000/user
```

## Tests and checks

```bash
npm run test
npm run test:cov
npm run lint
npm run format
```

## Notes

Data is stored in memory, so it resets whenever the app restarts. The goal of this repo is learning NestJS fundamentals, not persistence, authentication, deployment, or production architecture.
