import { call, fork, put, takeLatest, delay, take,} from "redux-saga/effects"
import {channel, Saga} from 'redux-saga'
import * as api from '../lib/api'
import { FetchTasksActions, TaskActions, TimerTasksActions } from "./actions/tasks-actions"

/**
 * What’s fork doing here? When rootSaga executes, it’s going to pause at every yield statement until the side effect is completed.
 * The fork method, however, allows rootSaga to move onto the next yield without a resolution. 
 * Each of these forks are said to be non-blocking. 
 * This implementation makes sense, because you want to kick off all the watchers at initialization, not only the first in the list.
 */
export default function* rootSaga() {
    yield takeLatest(TaskActions.FETCH_TASKS_STARTED,fetchTasks) // takes the last FETCH_TASKS_STARTED and cancels to begin a new one
    yield takeLatestById([TaskActions.TIMER_STARTED, TaskActions.TIMER_STOP], handleProgressTimer)
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

function* handleProgressTimer({payload, type}:any){
    console.log(type)
   if(type === TaskActions.TIMER_STARTED){
       while (true) {
           yield delay(1000)
           yield put<TimerTasksActions>({
               type: TaskActions.TIMER_INCREMENT,
               payload: { taskId: payload.taskId }
           })
       }
   }
}

function* takeLatestById(actionType:any, saga: Saga){
    const channelsMap:{[key:string]:any} = {}

    while(true){
        const action = (yield take(actionType)) as {[key:string]:any}
        const  {taskId} = action.payload

        if(!channelsMap[taskId]){
            channelsMap[taskId] = channel ()
            yield takeLatest(channelsMap[taskId], saga)
        }

        yield put(channelsMap[taskId], action)
    }
}