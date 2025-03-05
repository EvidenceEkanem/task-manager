// #region DB Connection

import { pgTable, serial, text, varchar, boolean } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	description: text('description'),
	completed: boolean('completed').notNull().default(false),
});

// #endregion
