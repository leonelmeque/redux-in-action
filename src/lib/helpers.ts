let _id = 1

export function uniqueId() {
    return _id++;
}

export const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];