import { TaskInterface } from "../../components/types";
import { CombinedTaskActions, TaskActions } from "../actions/tasks-actions";
import { createSelector } from 'reselect'
import { TASK_STATUSES } from "../../lib/constants";

export type State = {
    isLoading?: boolean,
    error?: string | undefined,
    tasks: TaskInterface[] | undefined,
    timer: number
    searchTerm?: string
}

export type RootState = {
    tasks: State;
};

const initState: State = {
    isLoading: false,
    tasks: [],
    error: undefined,
    timer: 0,
    searchTerm: ""
}

const getTasks = (state: RootState) => state.tasks.tasks
const getSearchTerm = (state: RootState) => state.tasks.searchTerm

// We memoize the function to avoid unecessary rerenders and unecessary calculations of the function
export const getFilteredTasks = createSelector([getTasks, getSearchTerm], (tasks, searchTerm = "") => tasks?.filter(task => task.title.match(new RegExp(searchTerm, 'i'))))

export const getGroupedAndFilteredTasks = createSelector([getFilteredTasks], (tasks) => {
    const grouped: { [key: string]: TaskInterface[] | undefined } = {}

    TASK_STATUSES.forEach(status => {
        grouped[status] = tasks?.filter((task) => task.status === status);
    })

    return grouped
})

export default function tasks(state = initState, action: CombinedTaskActions): State {
    const { type, payload } = action
    switch (type) {
        case TaskActions.FETCH_TASKS_STARTED: return {
            ...state,
            isLoading: true
        }
        case TaskActions.FETCH_TASKS_ERROR: return {
            ...state,
            isLoading: false,
            error: payload.error
        }
        case TaskActions.FETCH_TASKS_SUCCEEDED: return {
            ...state,
            isLoading: false,
            tasks: payload.tasks
        }
        case TaskActions.CREATE_TASK_SUCCEEDED: return {
            ...state,
            isLoading: false,
            tasks: state.tasks?.concat(payload?.task || [])
        }
        case TaskActions.CREATE_TASK_FAILED: return {
            ...state,
            isLoading: false,
            error: payload.error
        }
        case TaskActions.UPDATE_TASKS_SUCCEEDED: {
            const newTasks = state.tasks?.map(task => {
                if (task.id === payload.task?.id) {
                    return Object.assign({}, task, payload.task)
                }
                return task
            })
            return {
                ...state,
                tasks: newTasks
            }
        }
        case TaskActions.UPDATE_TASKS_ERROR: {
            return {
                ...state,
                error: payload.error
            }
        }
        case TaskActions.TIMER_INCREMENT: {
            const nextTasks = state.tasks?.map(task => {
                if (task.id === payload.taskId) return { ...task, timer: (task.timer ?? 0) + 1 }
                return task
            })
            return {
                ...state,
                tasks: nextTasks
            }
        }
        case TaskActions.FILTER_TASKS: {
            return {
                ...state,
                searchTerm: payload
            }
        }
        default: return state
    }
}