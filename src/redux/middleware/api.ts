import axios from "axios";
import { AnyAction, Dispatch } from "redux"

export const CALL_API = 'CALL_API'

const API_BASE_URL = 'http://localhost:3001';

type MakeCallProps = {
    endpoint: string
    method: 'GET' | 'PUT' | 'POST' | 'DELETE'
    body: any
}

function makeCall({ endpoint, method = 'GET', body }: MakeCallProps) {
    const url = `${API_BASE_URL}${endpoint}`

    const params = {
        method: method,
        data: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.get(url, params).then(resp => resp).catch((err) => err)
}

const apiMiddleware = (store: any) => (next: Dispatch) => (action: AnyAction) => {
    const callAPI = action[CALL_API]

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const [requestStartedType, successType, faiulureType] = callAPI.types

    next({ type: requestStartedType })

    return makeCall({
        method: callAPI.method,
        endpoint: callAPI.endpoint,
        body: callAPI.body

    }).then(res => {
        next({
            type: successType,
            payload: res.data
        })
    }, error => {
        next({
            type: faiulureType,
            error: error.message
        })
    })
}

export default apiMiddleware