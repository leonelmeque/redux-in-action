import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { asyncCreateTask } from '../redux/creators/tasks-creators-server'

const middlewares = [thunk]
export const mockStore = configureMockStore(middlewares)