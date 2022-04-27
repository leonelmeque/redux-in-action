import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'
import createSagaMiddleware from "@redux-saga/core";
import { analytics, api, logger } from "./middleware";
import rootSaga from './sagas'
import tasks from './reducers/tasks-reducer'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    tasks,
})

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: [thunk,sagaMiddleware,logger, analytics]
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>

export default store