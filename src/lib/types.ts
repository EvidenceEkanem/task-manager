/**
 * Task interface as stored in the DB and used by our app.
 */
export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
}
