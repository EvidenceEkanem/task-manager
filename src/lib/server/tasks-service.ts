// #region TaskService
// e: Database calls wrapped in a service (no direct DB calls in routes).

import { asc, eq } from 'drizzle-orm';
import type { Task } from '../types';
import { db } from './db';
import { tasks } from './db/schema';

/**
 * e: Retrieve all tasks from the database, ordered by ID ascending.
 * @returns Array of Task objects
 */
export async function getAllTasks(): Promise<Task[]> {
    // e: We want ALL tasks, including completed or not.
    return await db.select().from(tasks).orderBy(asc(tasks.id));
}

/**
 * e: Create a new task in the database.
 * @param title The title of the task
 * @param description The description of the task
 * @returns The newly created Task
 */
export async function createTask(
    title: string,
    description: string
): Promise<Task> {
    // e: We insert a row into the tasks table and return the newly created record.
    const [newRow] = await db.insert(tasks).values({ title, description }).returning();

    return newRow;
}

/**
 * e: Update a task by ID, setting whichever fields are provided.
 * @param id The task's ID
 * @param props Partial object with fields to update
 * @returns Updated task
 */
export async function updateTask(
    id: number,
    props: Partial<Pick<Task, 'title' | 'description' | 'completed'>>
): Promise<Task> {
    // e: build a dynamic update statement
    const updateData = {
        ...(props.title !== undefined ? { title: props.title } : {}),
        ...(props.description !== undefined ? { description: props.description } : {}),
        ...(props.completed !== undefined ? { completed: props.completed } : {})
    };

    const [updatedRow] = await db
        .update(tasks)
        .set(updateData)
        .where(eq(tasks.id, id))
        .returning();

    return updatedRow;
}

/**
 * e: Delete a task by ID.
 * @param id The task's ID
 * @returns The deleted task (for confirmation)
 */
export async function deleteTask(id: number): Promise<Task> {
    // e: We remove a task from the DB. The returned rows can be used to confirm success or show user feedback.
    const [deletedRow] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

    return deletedRow;
}
// #endregion
