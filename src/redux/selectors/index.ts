import { createSelector } from 'reselect'
import { TaskInterface } from '../../components/types';
import { TASK_STATUSES } from "../../lib/constants";
import { RootState } from "../types/shared";

const getTasks = (state: RootState) => state.tasks.tasks
const getSearchTerm = (state: RootState) => state.page.taskSearchTerm

const getTasksByProjectId = (state: RootState) => {
    const { currentProjectId } = state.page
    if (!currentProjectId || !state.page.currentProjectId) return []

    const tasksIds = state.projects.items[currentProjectId].tasks

    return tasksIds.map(id => state.tasks.items[id])
}

// We memoize the function to avoid unecessary rerenders and unecessary calculations of the function
export const getFilteredTasks = createSelector([getTasksByProjectId, getSearchTerm], (tasks, searchTerm = "") => tasks?.filter(task => task.title.match(new RegExp(searchTerm, 'i'))))

export const getGroupedAndFilteredTasks = createSelector([getFilteredTasks], (tasks) => {
    const grouped: { [key: string]: TaskInterface[] | undefined } = {}

    TASK_STATUSES.forEach(status => {
        grouped[status] = tasks?.filter((task) => task.status === status);
    })

    return grouped
})

export const getProjects = (state: RootState) => {
    return Object.keys(state.projects.items).map(id => state.projects.items[id])
}