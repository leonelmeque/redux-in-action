import { FunctionComponent } from "react";
import Task from "./Task";
import { TaskInterface } from "./types";

interface TaskListProps {
    tasks: TaskInterface[];
    status: string;
    onStatusChange:(...args:any)=>void
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, onStatusChange }) => (
    <div className="task-list">
        {tasks.map((task) => (
            <Task key={`task-${task.id}`} task={task} updateStatus={onStatusChange} />
        ))}
    </div>
);

export default TaskList;
