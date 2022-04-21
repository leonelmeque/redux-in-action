import { TaskInterface } from "../../components/types";
import { TasksActions } from "../actions/tasks-actions";
import { CreateTaskAction, FetchTasksAction, UpdateTaskAction } from "../creators/tasks-creators";

export type State = {
    tasks: TaskInterface[]
}

const initState: State = {
    tasks: []
}

type Actions =
    CreateTaskAction |
    UpdateTaskAction |
    FetchTasksAction


export default function tasks(state = initState, action: Actions): State {
    const { type, payload } = action

    switch (type) {
        case TasksActions.CREATE_TASK: return {
            tasks: state.tasks.concat(payload)
        }
        case TasksActions.UPDATE_TASK: return {
            tasks: state.tasks.map(task => {
                if (task.id === payload.id) {
                    return Object.assign({}, task, payload.params)
                }
                return task
            })
        }
        case TasksActions.FETCH_TASKS: return {
            tasks: payload
        }
        default: return state
    }
}