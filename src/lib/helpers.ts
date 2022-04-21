export function uniqueId() {
    return (Math.random() + 1).toString(36).substring(7);
}

export const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];