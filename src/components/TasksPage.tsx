import { ChangeEvent, Fragment, FunctionComponent, useState } from "react";
import { TASK_STATUSES } from "../lib/helpers";
import TaskList from "./TaskList";
import { TaskInterface } from "./types";

interface TasksPageProps {
    tasks: TaskInterface[];
    onCreateTask: (args: any) => void;
    onStatusChange: (...args: any) => void;
}

const TasksPage: FunctionComponent<TasksPageProps> = ({
    tasks,
    onCreateTask,
    onStatusChange,
}) => {
    const [state, setState] = useState<{ [key: string]: any }>({
        showNewCardForm: false,
        title: "",
        description: "",
    });

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        const newState = { ...state, [name]: value };
        setState(newState);
    };

    const _onCreateTask = (e: any) => {
        e.preventDefault();
        onCreateTask({
            title: state?.title,
            description: state?.description,
        });
        resetForm();
    };

    const resetForm = () => {
        setState({
            showNewCardForm: false,
            title: "",
            description: "",
        });
    };

    const toggleForm = () => {
        setState({
            showNewCardForm: !state?.showNewCardForm,
        });
    };

    const renderTaskLists = () =>
        TASK_STATUSES.map((status, index) => {
            const statusTask = tasks.filter((task) => task.status === status);
            return (
                <TaskList
                    key={`id-${index.toString()}`}
                    status={status}
                    tasks={statusTask}
                    onStatusChange={onStatusChange}
                />
            );
        });

    return (
        <Fragment>
            <div className="tasks">
                <div className="task-list-header">
                    <button className="btn btn-default" onClick={toggleForm}>
                        + New Task
                    </button>
                </div>
                {state?.showNewCardForm && (
                    <form className="task-list-form" onSubmit={_onCreateTask}>
                        <input
                            type="text"
                            className="full-with-input"
                            onChange={handleChange}
                            value={state?.title || ""}
                            name="title"
                            placeholder="title"
                        />
                        <input
                            type="text"
                            className="full-with-input"
                            onChange={handleChange}
                            value={state?.description || ""}
                            name="description"
                            placeholder="description"
                        />
                        <button className="button" type="submit">
                            Save
                        </button>
                    </form>
                )}
                <div className="tasks-list">{renderTaskLists()}</div>
            </div>
        </Fragment>
    );
};

export default TasksPage;
