import { call, fork, put, takeLatest } from "redux-saga/effects"
import * as api from '../lib/api'
import { FetchTasksActions, TaskActions } from "./actions/tasks-actions"
/**
 * What’s fork doing here? When rootSaga executes, it’s going to pause at every yield statement until the side effect is completed.
 * The fork method, however, allows rootSaga to move onto the next yield without a resolution. 
 * Each of these forks are said to be non-blocking. 
 * This implementation makes sense, because you want to kick off all the watchers at initialization, not only the first in the list.
 */
export default function* rootSaga() {
    yield takeLatest(TaskActions.FETCH_TASKS_STARTED,fetchTasks) // takes the last FETCH_TASKS_STARTED and cancels to begin a new one
    console.log('rootSaga reporting for duty')

}

function* fetchTasks(){
    try {
        const { data } = yield call(api.fetchTasks)
        yield put<FetchTasksActions>({
            type: TaskActions.FETCH_TASKS_SUCCEEDED,
            payload: { tasks: data }
        })
    } catch (e: any) {
        yield put<FetchTasksActions>({
            type: TaskActions.FETCH_TASKS_ERROR,
            payload: {
                error: e.message
            }
        })
    }
}

// function* watchFetchTasks() {
//     while (true) {
//         console.log('started!')
//         try {
//             const { data } = yield call(api.fetchTasks)
//             yield put<FetchTasksActions>({
//                 type: TaskActions.FETCH_TASKS_SUCCEEDED,
//                 payload: { tasks: data }
//             })
//         } catch (e: any) {
//             yield put<FetchTasksActions>({
//                 type: TaskActions.FETCH_TASKS_ERROR,
//                 payload: {
//                     error: e.message
//                 }
//             })
//         }
//     }
// }

// function* watchSomethingElse() {
//     yield
//     console.log('Watching something else!')
// }