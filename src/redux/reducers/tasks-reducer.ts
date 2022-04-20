import { TaskInterface } from "../../components/types";
import { mockTasks } from "../../mocks";
import { TasksActions } from "../actions/tasks-actions";
import { CreateTaskAction } from "../creators/tasks-creators";

type State = {
    tasks: TaskInterface[]
}

const initState: State = {
    tasks: mockTasks
}

type Actions = CreateTaskAction

export default function tasks(state = initState, action: Actions): State {
    const { type, payload } = action
    switch (type) {
        case TasksActions.CREATE_TASK: return {
            tasks: state.tasks.concat(payload)
        }
        default: return state
    }
}