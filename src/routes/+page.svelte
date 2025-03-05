<script lang="ts">
	// #region Imports
	import { onMount } from 'svelte';
	import { tasksStore } from '$lib/stores/tasksStore';
	import { apiCreateTask, apiDeleteTask, apiUpdateTask } from '$lib/services/tasksApi';
	import type { Task } from '$lib/types';
	// #endregion

	// #region Props
	export let data: {
		tasks: Task[];
	};
	// #endregion

	// #region Local State
	let newTitle = '';
	let newDescription = '';

	// For filtering & sorting:
	let filterText = '';
	let sortDirection: 'asc' | 'desc' = 'asc';
	// #endregion

	// #region Lifecycle
	onMount(() => {
		tasksStore.set(data.tasks);
	});
	// #endregion

	// #region Functions
	async function handleCreateTask() {
		if (!newTitle) {
			alert('Title is required.');
			return;
		}
		const created = await apiCreateTask(newTitle, newDescription);
		tasksStore.update((ts) => [created, ...ts]);
		newTitle = '';
		newDescription = '';
	}

	async function toggleCompletion(task: Task) {
		const updated = await apiUpdateTask(task.id, { completed: !task.completed });
		tasksStore.update((ts) => ts.map((t) => (t.id === updated.id ? updated : t)));
	}

	async function removeTask(task: Task) {
		if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
			return;
		}
		await apiDeleteTask(task.id);
		tasksStore.update((ts) => ts.filter((t) => t.id !== task.id));
	}
	// #endregion

	// #region Derived Data
	/**
	 * e: "filteredAndSortedTasks" is computed at runtime,
	 *    so we get reactivity when "filterText" or "sortDirection" changes,
	 *    or when the store changes.
	 */
	$: filteredAndSortedTasks = (() => {
		// 1) get the raw tasks from the store:
		const tasks = $tasksStore;

		// 2) filter them by "filterText"
		let filtered = tasks;
		if (filterText.trim().length > 0) {
			const lowerFilter = filterText.toLowerCase();
			filtered = tasks.filter((task) => task.title.toLowerCase().includes(lowerFilter));
		}

		// 3) sort them (e.g. by title ascending or descending)
		const sorted = filtered.slice().sort((a, b) => {
			// Compare by title
			if (sortDirection === 'asc') {
				return a.title.localeCompare(b.title);
			} else {
				return b.title.localeCompare(a.title);
			}
		});

		return sorted;
	})();
	// #endregion
</script>

<!-- MAIN CONTAINER -->
<div class="mx-auto mt-10 max-w-xl rounded border bg-white p-5 shadow">
	<h1 class="mb-4 text-2xl font-bold">Task Manager</h1>

	<!-- CREATE TASK FORM -->
	<div class="mb-5 flex flex-col gap-2 md:flex-row">
		<input
			class="flex-1 rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			placeholder="Title"
			bind:value={newTitle}
		/>
		<input
			class="flex-1 rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			placeholder="Description"
			bind:value={newDescription}
		/>
		<button
			class="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
			on:click={handleCreateTask}
		>
			Add Task
		</button>
	</div>

	<!-- FILTER & SORT OPTIONS -->
	<div class="mb-4 flex flex-col gap-4 sm:flex-row">
		<!-- Filter Input -->
		<div class="flex-1">
			<label class="mb-1 block text-sm font-medium" for="filterInput">Filter by Title:</label>
			<input
				id="filterInput"
				class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				placeholder="e.g. Learn"
				bind:value={filterText}
			/>
		</div>

		<!-- Sort Selector -->
		<div class="flex-1">
			<label class="mb-1 block text-sm font-medium" for="sortSelect">Sort Order:</label>
			<select
				id="sortSelect"
				class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				bind:value={sortDirection}
			>
				<option value="asc">Title A → Z</option>
				<option value="desc">Title Z → A</option>
			</select>
		</div>
	</div>

	<!-- TASK LIST -->
	{#if filteredAndSortedTasks.length === 0}
		<p class="text-gray-500">No matching tasks!</p>
	{:else}
		<ul class="space-y-2">
			{#each filteredAndSortedTasks as task}
				<li class="flex items-center justify-between rounded border bg-gray-50 p-3">
					<div class="flex items-center gap-2">
						<input
							type="checkbox"
							checked={task.completed}
							on:change={() => toggleCompletion(task)}
							class="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
						/>
						<div>
							<p class="font-semibold">{task.title}</p>
							{#if task.description}
								<p class="text-sm text-gray-700">{task.description}</p>
							{/if}
						</div>
					</div>
					<button
						class="text-red-500 hover:text-red-700"
						on:click={() => removeTask(task)}
						title="Delete Task"
					>
						✕
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
