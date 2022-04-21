import { Dispatch } from "redux"
import { TaskInterface } from "../../components/types"
import { uniqueId } from "../../lib/helpers"
import { TasksActions } from "../actions/tasks-actions"
import * as api from '../../lib/api'

export type CreateTaskAction = {
    type: TasksActions.CREATE_TASK,
    payload: TaskInterface
}
export const createTask = ({ title, description }: Pick<TaskInterface, 'title' | 'description'>): CreateTaskAction => ({
    type: TasksActions.CREATE_TASK,
    payload: {
        id: uniqueId(),
        title,
        description,
        status: 'Unstarted'
    }
})

export type UpdateTaskAction = {
    type: TasksActions.UPDATE_TASK,
    payload: {
        id: number,
        params: Omit<TaskInterface, 'id'>
    }
}

export const updateTask = ({ id, params }: UpdateTaskAction['payload']): UpdateTaskAction => ({
    type: TasksActions.UPDATE_TASK,
    payload: {
        id,
        params
    }
})

export type FetchTasksAction = {
    type: TasksActions.FETCH_TASKS,
    payload: TaskInterface[]
}

export const fetchTasksSucceeded = (tasks: TaskInterface[]): FetchTasksAction => ({
    type: TasksActions.FETCH_TASKS,
    payload: tasks

})

export const asyncFetchTasks = () => (dispatch: Dispatch) => {
    api.fetchTasks().then(res => {
        dispatch(fetchTasksSucceeded(res))
    })
}