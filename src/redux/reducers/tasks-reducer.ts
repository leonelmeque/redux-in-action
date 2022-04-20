import { TaskInterface } from "../../components/types";
import { mockTasks } from "../../mocks";
import { TasksActions } from "../actions/tasks-actions";
import { CreateTaskAction, UpdateTaskAction } from "../creators/tasks-creators";

type State = {
    tasks: TaskInterface[]
}

const initState: State = {
    tasks: mockTasks
}

type Actions =
    CreateTaskAction |
    UpdateTaskAction

    
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
        default: return state
    }
}