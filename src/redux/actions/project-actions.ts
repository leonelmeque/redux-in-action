import { ExtendsActionType, Metadata } from "../types/shared"
import { ReceveiEntitiesAction } from "./schema-actions"
import { CreateTasksActions } from "./tasks-actions"


enum FetchProjectsEnums {
    FETCH_PROJECTS_STARTED = "FETCH_PROJECTS_STARTED",
    FETCH_PROJECTS_SUCCEEDED = "FETCH_PROJECTS_SUCCEEDED",
    FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR"
}

export const ProjectActions = {...FetchProjectsEnums}

export interface FetchProjectAction extends ExtendsActionType<FetchProjectsEnums>{
    payload?:any
    meta?: Metadata
}

export type CombinedProjectActions = FetchProjectAction | ReceveiEntitiesAction | CreateTasksActions