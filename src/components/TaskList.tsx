import { FunctionComponent } from "react";
import Task from "./Task";
import { TaskInterface } from "./types";

interface TaskListProps {
    tasks: TaskInterface[];
    status: string;
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, status }) => (
    <div className="task-list">
        <div className="task-list-title">
            <strong>{status}</strong>
        </div>
        {tasks.map((task) => (
            <Task key={`task-${task.id}`} task={task} />
        ))}
    </div>
);

export default TaskList;
