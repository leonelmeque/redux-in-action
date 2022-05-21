import { ProjectInterface } from "../../components/types"
import { CombinedProjectActions, ProjectActions } from "../actions/project-actions"
import { SchemaActions } from "../actions/schema-actions"
import { TaskActions } from "../actions/tasks-actions"


export type ProjectsState = {
    items: {
        [key:string]:ProjectInterface
    }
    isLoading: boolean
    error: string | null
}

const initialState: ProjectsState = {
    items: {},
    isLoading: false,
    error: null
}

export default function projects(state = initialState, action: CombinedProjectActions): ProjectsState {
    switch (action.type) {
        case SchemaActions.RECEIVE_ENTITIES: {
            const { entities } = action.payload
            if (entities && entities.projects) {
                return {
                    ...state,
                    isLoading: false,
                    items: entities.projects
                }
            }

            return state
        }

        case TaskActions.CREATE_TASK_SUCCEEDED: {
            const { task } = action.payload
           
            const project = state.items[task?.projectId as string]
            return {
                ...state,
                items: {
                    ...state.items,
                    [task?.projectId as string]: {
                        ...project,
                        tasks: project.tasks.concat(task?.id as string)
                    }
                }
            }
        }
        case ProjectActions.FETCH_PROJECTS_STARTED: return {
            ...state,
            isLoading: true
        }
        case ProjectActions.FETCH_PROJECTS_SUCCEEDED: return {
            ...state,
            items: action.payload
        }
        case ProjectActions.FETCH_PROJECTS_ERROR: return {
            ...state,
            error: action.payload
        }
        default: return state
    }
}