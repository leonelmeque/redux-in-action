import { Analytics } from "../../components/types"
import { PageState } from "../reducers/page-reducer"
import { ProjectsState } from "../reducers/projects-reducer"
import { TasksState } from "../reducers/tasks-reducer"



export type Metadata = {
    analytics: Analytics
}
export interface ExtendsActionType<T> {
    type: T
}

export type RootState = {
    tasks: TasksState,
    projects: ProjectsState,
    page: PageState
}