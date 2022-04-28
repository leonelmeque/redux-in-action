import { ChangeEvent, Fragment, FunctionComponent, useState } from "react";
import { TASK_STATUSES, uniqueId } from "../lib/helpers";
import TaskList from "./TaskList";
import { TaskInterface } from "./types";

interface TasksPageProps {
    tasks: TaskInterface[];
    onCreateTask: (args: any) => void;
    onStatusChange: (...args: any) => void;
    onSearch: (searchTerm: string) => void;
}

const initState = {
    showNewCardForm: false,
    title: "",
    description: "",
};

const TasksPage: FunctionComponent<TasksPageProps> = ({
    tasks,
    onCreateTask,
    onStatusChange,
    onSearch: _onSearch,
}) => {
    const [state, setState] = useState<{ [key: string]: any }>(initState);

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        const newState = { ...state, [name]: value };
        setState(newState);
    };

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        _onSearch(value);
    };

    const _onCreateTask = (e: any) => {
        e.preventDefault();
        onCreateTask({
            title: state?.title,
            description: state?.description,
            status: "Unstarted",
            id: uniqueId(),
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

    const renderTaskLists = () => {
        const unstarted = tasks.filter((task) => task.status === "Unstarted");
        const completed = tasks.filter((task) => task.status === "Completed");
        const inProgress = tasks.filter((task) => task.status === "In Progress");
        return (
            <div className="flex flex-row gap-4">
                <TaskList
                    status="Unstarted"
                    tasks={unstarted}
                    onStatusChange={onStatusChange}
                />
                <TaskList
                    status="In Progress"
                    tasks={inProgress}
                    onStatusChange={onStatusChange}
                />
                <TaskList
                    status="Completed"
                    tasks={completed}
                    onStatusChange={onStatusChange}
                />
            </div>
        );
    };

    return (
        <Fragment>
            <div className="tasks">
                <div className="flex items-center justify-between my-4">
                    <h2 className="text-2xl">
                        {!state?.showNewCardForm ? "Your Tasks" : "Add a new task"}
                    </h2>
                    <div>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search task..."
                            className="border-[1px] p-3 bg-white"
                            onChange={onSearch}
                        />
                    </div>
                    <button
                        className="py-3 px-4 bg-black rounded-sm text-white font-bold"
                        onClick={toggleForm}>
                        + New Task
                    </button>
                </div>

                <div className="my-4">
                    {state?.showNewCardForm && (
                        <form className="flex gap-4 flex-col" onSubmit={_onCreateTask}>
                            <input
                                type="text"
                                className="px-2 py-4 border-[1px]"
                                onChange={handleChange}
                                value={state?.title || ""}
                                name="title"
                                placeholder="title"
                            />
                            <input
                                type="text"
                                className="px-2 py-4 border-[1px]"
                                onChange={handleChange}
                                value={state?.description || ""}
                                name="description"
                                placeholder="description"
                            />
                            <div className="self-end">
                                <button
                                    className="py-3 px-4 bg-green-300 font-bold rounded-sm"
                                    type="submit">
                                    Save task
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="tasks-list">{renderTaskLists()}</div>
            </div>
        </Fragment>
    );
};

export default TasksPage;
