import { ExtendsActionType } from "../types/shared"

enum ManageProjectsEnum {
    SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID"
}

enum SearchTasksEnum {
    FILTER_TASKS = "FILTER_TASKS"
}

export const PageActions = { ...SearchTasksEnum, ...ManageProjectsEnum }

export interface SearchTasksActions extends ExtendsActionType<SearchTasksEnum> {
    payload: string
}

export interface ManageProjectsActions extends ExtendsActionType<ManageProjectsEnum> {
    payload: {
        id: string | number
    }
}


export type CombinedPageActions = SearchTasksActions | ManageProjectsActions