import { SearchTasksActions, TaskActions } from "../actions/tasks-actions";

export const filterTasks = (searchTerm:string):SearchTasksActions => ({
    type: TaskActions.FILTER_TASKS,
    payload: searchTerm
})