// #region tasksApi
// e: Wrap fetch calls in a service function;

import type { Task } from '$lib/types';

const baseUrl = '/api/tasks';

export async function apiFetchTasks(): Promise<Task[]> {
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
}

export async function apiCreateTask(title: string, description: string): Promise<Task> {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response.json();
}

export async function apiUpdateTask(id: number, updateData: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const url = `${baseUrl}?id=${id}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
}

export async function apiDeleteTask(id: number): Promise<Task> {
    const url = `${baseUrl}?id=${id}`;

    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json();
}
// #endregion
