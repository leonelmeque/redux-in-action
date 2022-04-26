import { AnyAction, Dispatch } from "redux";
import * as analyticsClient from '../../lib/analytics'
const analyticsMiddleware = (store?: any) => (next: Dispatch) => (action: AnyAction) => {

    if (!action || !action.meta || !action.meta.analytics) {
        return next(action)
    }

    const { event, data } = action.meta.analytics

    analyticsClient.sendEventData(event, data).then(res => {
        console.log("Analytics data was sent successfully")
    }).catch((e) => {
        console.error("An error occureed while sendings analytics: ", e.toString())
    })

    return next(action)

}

export default analyticsMiddleware