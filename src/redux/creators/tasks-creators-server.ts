import { Dispatch } from "redux"
import { TaskID, TaskInterface } from "../../components/types"
import { TasksActions } from "../actions/tasks-actions"
import * as api from '../../lib/api'
import { RootState } from ".."

export type FetchTasksStartedAction = {
    type: TasksActions.FETCH_TASKS_STARTED,
    [key: string]: any
}

export const fetchTasksStarted = (): FetchTasksStartedAction => ({
    type: TasksActions.FETCH_TASKS_STARTED
})

export type CreateTaskAction = {
    type: TasksActions.CREATE_TASK,
    payload: TaskInterface
}
export const createTaskSucceeded = (payload: TaskInterface): CreateTaskAction => ({
    type: TasksActions.CREATE_TASK,
    payload
})

export const asyncCreateTask = (params: TaskInterface) => (dispatch: Dispatch) => {
    console.log(params)
    api.createTask(params).then((res) => {
        if (res.status <= 203) dispatch(createTaskSucceeded(params))
    })
}

export type UpdateTaskAction = {
    type: TasksActions.UPDATE_TASK,
    payload: {
        task: TaskInterface
    }
}

export const updateTask = (task: TaskInterface): UpdateTaskAction => ({
    type: TasksActions.UPDATE_TASK,
    payload: {
        task
    }
})

export const asyncUpdateTask = ({ id, params }: { id: TaskID, params: TaskInterface }) => (dispatch: Dispatch, getState: () => RootState) => {
    const task = getState().tasks.tasks.find(task => task.id === id)
    const updatedTask = Object.assign({}, task, params)

    api.updateTask(id, updatedTask).then((res) => {
        if (res.status < 203) dispatch(updateTask(updatedTask))
    })
}

export type FetchTasksAction = {
    type: TasksActions.FETCH_TASKS,
    payload: TaskInterface[]
}

export const fetchTasksSucceeded = (tasks: TaskInterface[]): FetchTasksAction => ({
    type: TasksActions.FETCH_TASKS,
    payload: tasks

})

export const asyncFetchTasks = () => (dispatch: Dispatch) => {
    dispatch(fetchTasksStarted())
    api.fetchTasks().then(res => {
        dispatch(fetchTasksSucceeded(res.data))
    })
}