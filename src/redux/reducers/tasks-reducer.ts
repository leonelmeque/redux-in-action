import { TaskInterface } from "../../components/types";
import { CombinedTaskActions, TaskActions } from "../actions/tasks-actions";
import { SchemaActions } from "../actions/schema-actions";

export type TasksState = {
    isLoading?: boolean,
    error?: string | undefined,
    tasks: TaskInterface[] | undefined,
    timer: number
    searchTerm?: string
    items?: any
}

const initState: TasksState = {
    isLoading: false,
    tasks: [],
    error: undefined,
    timer: 0,
    searchTerm: ""
}

export default function tasks(state = initState, action: CombinedTaskActions): TasksState {
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
        case TaskActions.CREATE_TASK_SUCCEEDED: {
            const { task } = action.payload

            const nextTasks = {
                ...state.items,
                [task?.id as string]: task
            }

            return {
                ...state,
                items: nextTasks
            }
        }
        case TaskActions.CREATE_TASK_FAILED: return {
            ...state,
            isLoading: false,
            error: payload.error
        }
        case TaskActions.UPDATE_TASKS_SUCCEEDED: {
            const { task } = action.payload

            const nextTasks = {
                ...state.items,
                [task?.id as string | number]: task
            }

            return {
                ...state,
                items: nextTasks
            }
        }
        case TaskActions.UPDATE_TASKS_ERROR: {
            return {
                ...state,
                error: payload.error
            }
        }
        case SchemaActions.RECEIVE_ENTITIES: {
            const { entities } = action.payload
            if (entities && entities.tasks) {
                return {
                    ...state,
                    isLoading: false,
                    items: entities.tasks
                }
            }
            return state
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