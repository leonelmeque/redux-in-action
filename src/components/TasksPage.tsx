import { ChangeEvent, Children, Fragment, FunctionComponent, useState } from "react";
import { uniqueId } from "../lib/helpers";
import projects from "../redux/reducers/projects-reducer";
import TaskList from "./TaskList";
import { TaskInterface } from "./types";

interface TasksPageProps {
    tasks: { [key: string]: TaskInterface[] | undefined };
    onCreateTask: (args: any) => void;
    onStatusChange: (...args: any) => void;
    onSearch: (searchTerm: string) => void;
    isLoading: boolean;
}

const initState = {
    showNewCardForm: false,
    title: "",
    description: "",
    isLoading: false,
};

const TasksPage: FunctionComponent<TasksPageProps> = ({
    tasks,
    onCreateTask,
    onStatusChange,
    onSearch: _onSearch,
    isLoading,
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

    const renderTaskLists = () =>
        Object.keys(tasks).map((status) => {
            const tasksByStatus = tasks[status];
            return (
                <TaskList
                    key={status}
                    status={status}
                    tasks={tasksByStatus}
                    onStatusChange={onStatusChange}
                />
            );
        });

    if (isLoading)
        return (
            <div className="flex text-center max-w-4xl mx-auto items-center justify-center h-max">
                <p className="font-bold text-2xls">Loading data...</p>
            </div>
        );

    return (
        <Fragment>
            <div className="tasks">
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
                <div className="flex flex-row gap-4">{renderTaskLists()}</div>
            </div>
        </Fragment>
    );
};

export default TasksPage;
