import { Dispatch } from "redux";
import { FetchProjectAction, ProjectActions } from "../actions/project-actions";
import * as api from "../../lib/api";
import { RootState } from "../reducers/tasks-reducer";

export const fetchProjectsStarted = (): FetchProjectAction => ({
    type: ProjectActions.FETCH_PROJECTS_STARTED,
    // payload: { boards }
})

export const fetchProjectsSucceded = (projects: any): FetchProjectAction => ({
    type: ProjectActions.FETCH_PROJECTS_SUCCEEDED,
    payload: { projects },
    meta: {
        analytics: {
            event: ProjectActions.FETCH_PROJECTS_SUCCEEDED,
            data: {
                id: ''
            }
        }
    }
})

export const fetchProjectsFailed = (err: any): FetchProjectAction => ({
    type: ProjectActions.FETCH_PROJECTS_ERROR,
    payload: err,
    meta: {
        analytics: {
            event: ProjectActions.FETCH_PROJECTS_ERROR,
            data: {
                id: ''
            }
        }
    }
})


export const fetchProjects = async () => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchProjectsStarted())
    return api.fetchProjects().then(res => {
        const projects = res.data

        dispatch(fetchProjectsSucceded(projects))

    }).catch(e => {
        console.error(e)
        dispatch(fetchProjectsFailed(e))
    })
}