import axios from "axios"
import { TaskInterface } from "../components/types"
const API_URL = "http://localhost:3001"

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


export async function fetchProjects(){
    return client.get("/projects?_embed=tasks")
}

export async function fetchTasks() {
    return client.get(`/tasks`)
}

export async function createTask(params: TaskInterface) {
    return client.post('/tasks', params)
}

export async function updateTask(id: (string|number), params: Omit<TaskInterface, 'id'>) {
    return client.put(`/tasks/${id}`, params)
}