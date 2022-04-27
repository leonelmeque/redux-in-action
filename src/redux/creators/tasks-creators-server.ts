import { Dispatch } from "redux"
import { TaskID, TaskInterface } from "../../components/types"
import { CreateTasksActions, FetchTasksActions, UpdateTasksActions, TaskActions } from "../actions/tasks-actions"
import * as api from '../../lib/api'
import { RootState } from ".."
import { CALL_API } from "../middleware/api"






// export const createTask = (params: TaskInterface) => {
//     return {
//         [CALL_API]: {
//             types: [TasksActions]
//         }
//     }
// }


export const fetchTasksStarted = (): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_STARTED,
    payload:{}
})

export const fetchTasksError = (errorMessage: string): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_ERROR,
    payload: {
        error: errorMessage
    }
})

export const createTaskSucceeded = (task: TaskInterface): CreateTasksActions => ({
    type: TaskActions.CREATE_TASK_SUCCEEDED,
    payload:{task},
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
    console.log(params)
    api.createTask(params).then((res) => {
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
    const task = getState().tasks.tasks?.find(task => task.id === id)
    const updatedTask = Object.assign({}, task, params)

    api.updateTask(id, updatedTask).then((res) => {
        if (res.status < 203) dispatch(updateTask(updatedTask))
    })
}

export const fetchTasksSucceeded = (tasks: TaskInterface[]): FetchTasksActions => ({
    type: TaskActions.FETCH_TASKS_SUCCEEDED,
    payload: {tasks}

})

export const asyncFetchTasks = () => (dispatch: Dispatch) => {
    dispatch(fetchTasksStarted())
    api.fetchTasks().then(res => {
        if (res.status < 203) dispatch(fetchTasksSucceeded(res.data))
    }).catch((e) => {
        dispatch(fetchTasksError(e.message))
    })
}