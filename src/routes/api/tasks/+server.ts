// #region Tasks CRUD Endpoint
// e: SvelteKit server route that implements RESTful CRUD over tasks.

import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} from '$lib/server/tasks-service';

/**
 * e: GET /api/tasks - Retrieves all tasks
 */
export async function GET() {
    // e: This endpoint returns all tasks from the DB in JSON format.
    const tasks = await getAllTasks();
    return json(tasks);
}

/**
 * e: POST /api/tasks - Creates a new task
 */
export async function POST({ request }: RequestEvent) {
    // e: This endpoint creates a new task
    const { title, description } = await request.json();

    // e: error-checking
    if (!title) {
        return new Response('Title is required', { status: 400 });
    }

    const newTask = await createTask(title, description || '');
    return json(newTask);
}

/**
 * e: PATCH /api/tasks/[id] - Update an existing task
 */

export async function PATCH({ request, url }: RequestEvent) {
    // e: We read the "id" from the query param
    const id = Number(url.searchParams.get('id'));

    // e: error-checking
    if (!id) {
        return new Response('Missing or invalid ID', { status: 400 });
    }

    const body = await request.json();
    const updatedTask = await updateTask(id, body);
    return json(updatedTask);
}

/**
 * e: Delete /api/tasks/[id] - Deletes a task
 */
export async function DELETE({ url }: RequestEvent) {
    // e: We read the "id" from the query param
    const id = Number(url.searchParams.get('id'));

    // e: error-checking
    if (!id) {
        return new Response('Missing or invalid ID', { status: 400 });
    }

    const deletedTask = await deleteTask(id);
    return json(deletedTask);
}
// #endregion
