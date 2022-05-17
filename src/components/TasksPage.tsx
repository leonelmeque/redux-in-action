import { ChangeEvent, Fragment, FunctionComponent, useState } from "react";
import { uniqueId } from "../lib/helpers";
import TaskList from "./TaskList";
import { TaskInterface } from "./types";

interface TasksPageProps {
    tasks: {[key: string]: TaskInterface[] | undefined};
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
  
      return (
            <div className="flex flex-row gap-4">
                {Object.keys(tasks).map((status) => {
                    const tasksByStatus = tasks[status];

                    return (
                        <TaskList
                            key={status}
                            status={status}
                            tasks={tasksByStatus}
                            onStatusChange={onStatusChange}
                        />
                    );
                })}
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
                    <div>
                        Project :{" "}
                        <select name="project" id="project" className="border py-3 px-4">
                            <option value="project 1">project 1</option>
                            <option value="project 2">project 2</option>
                            <option value="project 3">project 3</option>
                        </select>
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
