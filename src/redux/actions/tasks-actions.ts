import { TaskInterface } from "../../components/types"

export enum TasksActions {
    CREATE_TASK = 'CREATE_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED",
    FETCH_TASKS_ERROR = "FETCH_STASKS_ERROR",
}

export type FetchTasksErrorAction = {
    type: TasksActions.FETCH_TASKS_ERROR
    payload: string
}

export type FetchTasksStartedAction = {
    type: TasksActions.FETCH_TASKS_STARTED,
    [key: string]: any
}

export type CreateTaskAction = {
    type: TasksActions.CREATE_TASK,
    payload: TaskInterface
}

export type UpdateTaskAction = {
    type: TasksActions.UPDATE_TASK,
    payload: {
        task: TaskInterface
    }
}

export type FetchTasksAction = {
    type: TasksActions.FETCH_TASKS,
    payload: TaskInterface[]
}


