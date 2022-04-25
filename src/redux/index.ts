import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'
import { logger } from "./middleware";
import tasks from './reducers/tasks-reducer'

const reducers = combineReducers({
    tasks,
})

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware:[logger,thunk]
})

export type RootState = ReturnType<typeof store.getState>

export default store