import { TaskInterface } from "../../components/types";
import { TasksActions } from "../actions/tasks-actions";
import { CreateTaskAction, FetchTasksAction, FetchTasksStartedAction, UpdateTaskAction } from "../creators/tasks-creators-server";

export type State = {
    isLoading?: boolean,
    tasks: TaskInterface[] 
}

const initState: State = {
    isLoading: false,
    tasks: []
}

type Actions =
    CreateTaskAction |
    UpdateTaskAction |
    FetchTasksAction |
    FetchTasksStartedAction


export default function tasks(state = initState, action: Actions): State {
    const { type, payload } = action
    switch (type) {
        case TasksActions.FETCH_TASKS_STARTED: return {
            ...state,
            isLoading: true
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