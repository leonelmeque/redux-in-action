import { ManageProjectsActions, PageActions } from "../actions/page-actions";

export const setCurrentProjectId = (id: string | number): ManageProjectsActions => (
    {
        type: PageActions.SET_CURRENT_PROJECT_ID,
        payload:{
            id
        }
    }
)