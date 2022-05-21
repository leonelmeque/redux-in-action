import { TaskInterface } from "../../components/types"
import { ExtendsActionType, Metadata } from "../types/shared"
import { ReceveiEntitiesAction } from "./schema-actions"

enum CreateTasksEnums {
    CREATE_TASK_STARTED = "CREATE_TASK_STARTED",
    CREATE_TASK_SUCCEEDED = "CREATE_TASK_SUCCEEDED",
    CREATE_TASK_FAILED = "CREATE_TASK_FAILED",
}

enum FetchTasksEnums {
    FETCH_TASKS_SUCCEEDED = "FETCH_TASKS_SUCCEEDED",
    FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED",
    FETCH_TASKS_ERROR = "FETCH_STASKS_ERROR",
}

enum UpdateTasksEnums {
    UPDATE_TASKS_SUCCEEDED = "UPDATE_TASKS_SUCCEEDED",
    UPDATE_TASKS_STARTED = "UPDATE_TASKS_STARTED",
    UPDATE_TASKS_ERROR = "UPDATE_STASKS_ERROR",
}

enum TimerTasksEnums {
    TIMER_STARTED = "TIMER_STARTED",
    TIMER_STOP = "TIMER_STOP",
    TIMER_INCREMENT = "TIMER_INCREMENT"
}

enum SearchTasksEnum {
    FILTER_TASKS = "FILTER_TASKS"
}

export const TaskActions = { ...CreateTasksEnums, ...FetchTasksEnums, ...UpdateTasksEnums, ...TimerTasksEnums, ...SearchTasksEnum }

type TasksPayload = {
    tasks?: TaskInterface[]
    task?: TaskInterface
    error?: string
    taskId?: string | number
}

export interface CreateTasksActions extends ExtendsActionType<CreateTasksEnums> {
    payload: Omit<TasksPayload, 'tasks'>
    meta?: Metadata
}

export interface FetchTasksActions extends ExtendsActionType<FetchTasksEnums> {
    payload: Omit<TasksPayload, 'task'>
}

export interface UpdateTasksActions extends ExtendsActionType<UpdateTasksEnums> {
    payload: Omit<TasksPayload, 'tasks'>
    meta?: Metadata
}

export interface TimerTasksActions extends ExtendsActionType<TimerTasksEnums> {
    payload: Pick<TasksPayload, 'taskId'>
}

export interface SearchTasksActions extends ExtendsActionType<SearchTasksEnum> {
    payload: string
}

export type CombinedTaskActions =
    CreateTasksActions |
    FetchTasksActions |
    UpdateTasksActions |
    TimerTasksActions |
    SearchTasksActions | 
    ReceveiEntitiesAction

