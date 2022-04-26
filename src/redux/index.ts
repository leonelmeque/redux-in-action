import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'
import { analytics, logger } from "./middleware";
import tasks from './reducers/tasks-reducer'

const reducers = combineReducers({
    tasks,
})

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware:[thunk, logger, analytics]
})

export type RootState = ReturnType<typeof store.getState>

export default store