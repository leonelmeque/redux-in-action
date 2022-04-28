
export type TaskID = number | string
export interface TaskInterface {
    id?: TaskID
    description: string
    title: string
    status?: string
    timer?:number
}

export type Analytics = {
    event: string,
    data: {
        id: string | number
    }
}