import axios from "axios"
const API_URL = "https://jsonplaceholder.typicode.com"



export async function fetchTasks() {
    const res = await axios(`${API_URL}/todos`)
    const data =  res.data
    return data
}