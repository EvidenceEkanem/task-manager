# My Task Manager App (SvelteKit + Docker + Postgres)

This is a minimal example of a Task Manager application using SvelteKit 4, PostgreSQL (via Docker), and a clear coding standard.

## Features

- **Docker-based PostgreSQL**: Spin up a database with `docker-compose`.
- **CRUD Endpoints**: SvelteKit server routes for tasks (create, read, update, delete).
- **Frontend**:
  - Displays a task list (SSR).
  - UI forms for creating tasks.
  - Buttons to update or delete tasks.
  - Reactive state management with Svelte stores.

## RapidTee Golf Coding Standards

This project demonstrates:

- **Service Layer**: Database calls are in `tasks-service.ts`; no direct DB calls from route handlers.
- **API Layer**: `+server.ts` route for tasks handles RESTful endpoints (CRUD).
- **Client Services**: `tasksApi.ts` wraps fetch calls, so Svelte components do not fetch directly.
- **Comments**: JSDoc for public functions, “why” comments before important logic blocks.
- **Variable/Function Names**: Clear, human-readable, boolean variables prefixed with `is/has/should`.
- **Security**: Basic validations (e.g., checking required fields for create/update).

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Spin up PostgreSQL**:
   ```bash
   npm run db:start
   ```
3. **Initialize the database**:
   ```bash
   npm run migrate:up
   ```
4. **Run the SvelteKit dev server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** at [http://localhost:5173](http://localhost:5173) (or the port displayed in your terminal).

## If I Had More Time

- **More robust validation** using a schema library (e.g. Zod) to fully validate payloads.
- **Authentication & Authorization** to secure endpoints.
- **More error handling** in the API and the UI (e.g., custom error messages, use notification library to display messages).
- **Comprehensive Tests**: Using Vitest/Cypress to test both backend and frontend.
- **Better UI**: Add drag-and-drop reordering, etc.

## Troubleshooting

- If you have issues connecting to the database, ensure your Docker container is running and your environment variables match `db.ts`.
- Check logs for any SvelteKit route errors.
