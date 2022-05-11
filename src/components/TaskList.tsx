import { FunctionComponent } from "react";
import Task from "./Task";
import { TaskInterface } from "./types";

interface TaskListProps {
    tasks?: TaskInterface[] ;
    status: string;
    onStatusChange:(...args:any)=>void
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, onStatusChange, status }) => (
    <div className="flex-1">
        <h1 className="text-xl font-bold">{status}</h1>
        {tasks?.map((task) => (
            <Task key={`${task.id}`} task={task} updateStatus={onStatusChange} />
        ))}
    </div>
);

export default TaskList;
