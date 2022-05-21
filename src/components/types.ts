
export type TaskID = number | string
export interface TaskInterface {
    id?: TaskID
    description: string
    title: string
    status?: string
    timer?:number
    projectId:string
}

export interface ProjectInterface {
    id: number,
    name: string,
    tasks: string[]
}

export type Analytics = {
    event: string,
    data: {
        id: string | number
    }
}