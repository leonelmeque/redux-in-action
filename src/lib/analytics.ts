import axios from "axios"
const API_URL = "http://localhost:3001"

const analyticsCient = axios.create({
    baseURL:API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
export const sendEventData = (event: string, data:string) =>{
    return analyticsCient.post(`/analytics`, {event,data})
}