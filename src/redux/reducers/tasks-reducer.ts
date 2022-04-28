import { TaskInterface } from "../../components/types";
import { CombinedTaskActions, TaskActions } from "../actions/tasks-actions";

export type State = {
    isLoading?: boolean,
    error?: string | undefined,
    tasks: TaskInterface[] | undefined,
    timer: number
}

const initState: State = {
    isLoading: false,
    tasks: [],
    error: undefined,
    timer: 0
}

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
        default: return state
    }
}