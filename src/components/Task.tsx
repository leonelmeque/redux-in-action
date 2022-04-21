import { ChangeEvent } from "react";
import { TASK_STATUSES } from "../lib/helpers";
import { TaskInterface } from "./types";

const container = "flex flex-col gap-2 cursor-pointer border-[1px] relative";

const Task = ({
    task,
    updateStatus,
}: {
    task: TaskInterface;
    updateStatus: (...args: any) => void;
}) => {
    const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { id, ...rest } = task;
        updateStatus(id, {...rest, status:e.target.value});
    };

    return (
        <div className={`${container} bg-white rounded p-4 my-2`}>
            <div className="task-header">
                <h2 className="font-bold text-lg">{task.title}</h2>
            </div>
            <div className="text-sm">{task.description}</div>
            <div className="flex justify-end">
                <select
                    className="absolute top-1/2 right-4 -translate-y-1/2 border-[1px] p-2 rounded font-bold"
                    name="task-status"
                    id="task-status"
                    defaultValue={task.status}
                    onChange={onStatusChange}>
                    {TASK_STATUSES.map((status, index) => (
                        <option key={`task-status-${index}`} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Task;
