import { ChangeEvent } from "react";
import { TASK_STATUSES } from "../lib/constants";
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
        updateStatus(id, { ...rest, status: e.target.value });
    };

    return (
        <div
            className={`${container} bg-white rounded my-2 hover:bg-slate-300 transition delay-75 ease-in-out`}>
            <div className="flex justify-between p-4 border-b-slate-200 border-b-[1px]">
                <h2 className="font-semibold text-base">{task.title}</h2>
                <div className="flex justify-end">
                    <select
                        className="border-[1px] p-1 rounded text-xs font-bold "
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
            <div className="p-4">
                <div className="text-sm ">{task.description}</div>
                <div className="text-right">{task.timer}s</div>
            </div>
        </div>
    );
};

export default Task;
