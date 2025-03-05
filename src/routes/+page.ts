// #region Load tasks in SSR
import type { PageLoad } from './$types';
import { apiFetchTasks } from '$lib/services/tasksApi';
import type { Task } from '$lib/types';

/**
 * e: Load function for SSR tasks list. 
 *    This runs on the server (and can run on the client too in some modes).
 */
export const load: PageLoad = async () => {
    // e: We fetch tasks server-side so that the page is rendered with data.
    let tasks: Task[] = [];
    try {
        tasks = await apiFetchTasks();
    } catch (error) {
        console.error(error);
    }

    return {
        tasks
    };
};
// #endregion
