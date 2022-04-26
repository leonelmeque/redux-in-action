import { Dispatch } from "redux"
import { TaskID, TaskInterface } from "../../components/types"
import { CreateTaskAction, FetchTasksAction, FetchTasksErrorAction, FetchTasksStartedAction, TasksActions, UpdateTaskAction } from "../actions/tasks-actions"
import * as api from '../../lib/api'
import { RootState } from ".."


export const fetchTasksStarted = (): FetchTasksStartedAction => ({
    type: TasksActions.FETCH_TASKS_STARTED,

})

export const fetchTasksError = (errorMessage: string): FetchTasksErrorAction => ({
    type: TasksActions.FETCH_TASKS_ERROR,
    payload: errorMessage
})

export const createTaskSucceeded = (payload: TaskInterface): CreateTaskAction => ({
    type: TasksActions.CREATE_TASK,
    payload,
    meta: {
        analytics: {
            event: TasksActions.CREATE_TASK,
            data: {
                id: payload.id as string
            }
        }
    }
})

export const asyncCreateTask = (params: TaskInterface) => (dispatch: Dispatch) => {
    console.log(params)
    api.createTask(params).then((res) => {
        if (res.status <= 203) dispatch(createTaskSucceeded(params))
    })
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

export const fetchTasksSucceeded = (tasks: TaskInterface[]): FetchTasksAction => ({
    type: TasksActions.FETCH_TASKS,
    payload: tasks

})

export const asyncFetchTasks = () => (dispatch: Dispatch) => {
    dispatch(fetchTasksStarted())
    api.fetchTasks().then(res => {
        if (res.status < 203) dispatch(fetchTasksSucceeded(res.data))
    }).catch((e) => {
        dispatch(fetchTasksError(e.message))
    })
}