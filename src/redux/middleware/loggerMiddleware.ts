import { AnyAction, Dispatch } from "redux";

const loggerMiddleware = (store?:any) => (next:Dispatch) => (action:AnyAction) => {
    console.group(action.type)
    console.log('Dispatching: ', action)
    const result = next(action)
    console.log('next state: ', store.getState())
    console.groupEnd()
    return result
}

export default loggerMiddleware