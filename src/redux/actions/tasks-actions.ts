import { Analytics, TaskInterface } from "../../components/types"

export enum CreateTasksEnums {
    CREATE_TASK_STARTED = "CREATE_TASK_STARTED",
    CREATE_TASK_SUCCEEDED = "CREATE_TASK_SUCCEEDED",
    CREATE_TASK_FAILED = "CREATE_TASK_FAILED",
}

export enum FetchTasksEnums {
    FETCH_TASKS_SUCCEEDED = "FETCH_TASKS_SUCCEEDED",
    FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED",
    FETCH_TASKS_ERROR = "FETCH_STASKS_ERROR",
}

export enum UpdateTasksEnums {
    UPDATE_TASKS_SUCCEEDED = "UPDATE_TASKS_SUCCEEDED",
    UPDATE_TASKS_STARTED = "UPDATE_TASKS_STARTED",
    UPDATE_TASKS_ERROR = "UPDATE_STASKS_ERROR",
}

// export type _TasksActions = CreateTasksEnums | FetchTasksEnums | UpdateTasksEnums

export const TaskActions = {...CreateTasksEnums, ...FetchTasksEnums, ...UpdateTasksEnums}


type TasksPayload = {
    tasks?: TaskInterface []
    task?: TaskInterface 
    error?: string
}

type Metadata = {
    analytics: Analytics
}
export interface ExtendsActionType<T> {
    type: T
}
export interface CreateTasksActions extends ExtendsActionType<CreateTasksEnums>{
    payload: Omit<TasksPayload, 'tasks'>
    meta?: Metadata
}

export interface FetchTasksActions extends ExtendsActionType<FetchTasksEnums>{
    payload: Omit<TasksPayload, 'task'>
}

export interface UpdateTasksActions extends ExtendsActionType<UpdateTasksEnums>{
    payload: Omit<TasksPayload, 'tasks'>
    meta?: Metadata
}

export type CombinedTaskActions = CreateTasksActions | FetchTasksActions | UpdateTasksActions

