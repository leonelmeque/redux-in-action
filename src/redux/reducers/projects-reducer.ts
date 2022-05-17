import { CombinedProjectActions, ProjectActions } from "../actions/project-actions"


export type ProjectsState = {
    items: any[]
    isLoading: boolean
    error: string | null
}

const initialState:ProjectsState = {
    items: [],
    isLoading: false,
    error: null
}

export default function projects(state = initialState, action:CombinedProjectActions):ProjectsState {
    switch(action.type){
         case ProjectActions.FETCH_PROJECTS_STARTED : return {
             ...state,
             isLoading: true
         }
         case ProjectActions.FETCH_PROJECTS_SUCCEEDED : return{
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