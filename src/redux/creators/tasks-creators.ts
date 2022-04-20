import { TaskInterface } from "../../components/types"
import { uniqueId } from "../../lib/helpers"
import { TasksActions } from "../actions/tasks-actions"

export type CreateTaskAction = {
    type: TasksActions.CREATE_TASK,
    payload: TaskInterface
}
export const createTask = ({ title, description }: Pick<TaskInterface,'title' | 'description'>): CreateTaskAction => ({
    type: TasksActions.CREATE_TASK,
    payload: {
        id: uniqueId(),
        title,
        description,
        status: 'Unstarted'
    }
})