import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'
import tasks from './reducers/tasks-reducer'

const reducers = combineReducers({
    tasks,
})

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware:[thunk]
})

export default store