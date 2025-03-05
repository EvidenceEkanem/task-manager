// #region tasksStore
/**
 * e: This store holds our tasks in memory for immediate UI reactivity.
 * r: keeps server state in sync by refetching or updating from the server.
 */

import { writable } from 'svelte/store';
import type { Task } from '$lib/types';

export const tasksStore = writable<Task[]>([]);

// #endregion
