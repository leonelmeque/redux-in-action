import { TaskInterface } from "../../components/types";
import { CreateTaskAction, FetchTasksAction, FetchTasksErrorAction, FetchTasksStartedAction, TasksActions, UpdateTaskAction } from "../actions/tasks-actions";

export type State = {
    isLoading?: boolean,
    error?: string | undefined,
    tasks: TaskInterface[]
}

const initState: State = {
    isLoading: false,
    tasks: [],
    error: undefined
}

type Actions =
    CreateTaskAction |
    UpdateTaskAction |
    FetchTasksAction |
    FetchTasksStartedAction |
    FetchTasksErrorAction


export default function tasks(state = initState, action: Actions): State {
    const { type, payload } = action
    switch (type) {
        case TasksActions.FETCH_TASKS_STARTED: return {
            ...state,
            isLoading: true
        }
        case TasksActions.FETCH_TASKS_ERROR: return {
            ...state,
            isLoading: false,
            error: payload
        }
        case TasksActions.CREATE_TASK: return {
            ...state,
            isLoading: false,
            tasks: state.tasks.concat(payload)
        }
        case TasksActions.UPDATE_TASK: {
            const newTasks = state.tasks.map(task => {
                if (task.id === payload.task.id) {
                    return Object.assign({}, task, payload.task)
                }
                return task
            })
            return {
                ...state,
                tasks: newTasks
            }
        }
        case TasksActions.FETCH_TASKS: return {
            ...state,
            isLoading: false,
            tasks: payload
        }
        default: return state
    }
}