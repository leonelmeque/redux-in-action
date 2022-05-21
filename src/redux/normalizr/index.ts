import { schema } from "normalizr";

export const taskSchema = new schema.Entity('tasks')
export const projectSchema = new schema.Entity('projects',{
    tasks: [taskSchema]
})

