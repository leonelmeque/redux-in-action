import { Dispatch } from "redux";
import { FetchProjectAction, ProjectActions } from "../actions/project-actions";
import * as api from "../../lib/api";
import { RootState } from "../types/shared";
import { projectSchema } from "../normalizr";
import { normalize } from "normalizr";
import { receiveEntities } from "./schema-creators";
import { setCurrentProjectId } from "./page-creators-ui";


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


export const asyncfetchProjects = () => (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchProjectsStarted())
    return api.fetchProjects().then(res => {
        const projects = res.data
        
        const normalizedData = normalize(projects, [projectSchema])
        console.log(normalizedData)
        dispatch(receiveEntities(normalizedData))

        if (!getState().page.currentProjectId) {
            const defaultProjectId = projects[0].id
            dispatch(setCurrentProjectId(defaultProjectId))
        }


    }).catch(e => {
        console.error(e)
        dispatch(fetchProjectsFailed(e))
    })
}


