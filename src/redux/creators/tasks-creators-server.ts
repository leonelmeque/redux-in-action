import { Dispatch } from "redux"
import { TaskID, TaskInterface } from "../../components/types"
import { CreateTasksActions, FetchTasksActions, UpdateTasksActions, TaskActions } from "../actions/tasks-actions"
import * as api from '../../lib/api'
import { RootState } from "../types/shared"


export const fetchTasksStarted = (): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_STARTED,
    payload: {}
})

export const progressTimerStart = (taskId: string | number) => ({
    type: TaskActions.TIMER_STARTED,
    payload: {
        taskId
    }
})

export const progressTimerStop = (taskId: string | number) => ({
    type: TaskActions.TIMER_STOP,
    payload: {
        taskId
    }
})

export const fetchTasksError = (errorMessage: string): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_ERROR,
    payload: {
        error: errorMessage
    }
})

export const createTaskSucceeded = (task: TaskInterface): CreateTasksActions => ({
    type: TaskActions.CREATE_TASK_SUCCEEDED,
    payload: { task },
    meta: {
        analytics: {
            event: TaskActions.CREATE_TASK_SUCCEEDED,
            data: {
                id: task.id as string
            }
        }
    }
})

export const asyncCreateTask = (params: TaskInterface) => (dispatch: Dispatch) => {
    return api.createTask(params).then((res) => {
        if (res.status <= 203) dispatch(createTaskSucceeded(params))
    })
}

export const updateTask = (task: TaskInterface): UpdateTasksActions => ({
    type: TaskActions.UPDATE_TASKS_SUCCEEDED,
    payload: {
        task
    }
})

export const asyncUpdateTask = ({ id, params }: { id: TaskID, params: TaskInterface }) => (dispatch: Dispatch, getState: () => RootState) => {
  
    const task = getState().tasks.items[id]
    const updatedTask = Object.assign({}, task, params)

    api.updateTask(id, updatedTask).then((res) => {
        if (res.status < 203) dispatch(updateTask(updatedTask))
        if (res.data.status === 'In Progress') dispatch(progressTimerStart(res.data.id))
        if (task?.status === "In Progress") dispatch(progressTimerStop(res.data.id))
    })
}

export const fetchTasksSucceeded = (tasks: TaskInterface[]): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_SUCCEEDED,
    payload: { tasks }

})

export const asyncFetchTasks = () => async (dispatch: Dispatch) => {
    try {
        const res = await api.fetchTasks()
        if (res.status < 203) dispatch(fetchTasksSucceeded(res.data))
    } catch (e: any) {
        dispatch(fetchTasksError(e.message))
    }
}
