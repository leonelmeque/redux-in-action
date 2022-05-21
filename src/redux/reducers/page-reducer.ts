import { CombinedPageActions, PageActions } from "../actions/page-actions"

const initialPageState: PageState = {
    currentProjectId: null,
    taskSearchTerm: ''
}

export type PageState = {
    currentProjectId: string | number | null
    taskSearchTerm: string
}


export default function page(state = initialPageState, action: CombinedPageActions): PageState {
    switch (action.type) {
        case PageActions.SET_CURRENT_PROJECT_ID: return { ...state, currentProjectId: action.payload.id }
        case PageActions.FILTER_TASKS: {
            return { ...state, taskSearchTerm: action.payload }
        }
        default: return state
    }
}