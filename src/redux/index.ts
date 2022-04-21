import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import tasks from './reducers/tasks-reducer'

const reducers = combineReducers({
    tasks
})

const store = configureStore({
    reducer: reducers,
    devTools: true
})

export default store