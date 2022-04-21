import { FunctionComponent, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { TaskInterface } from "./components/types";
import { asyncFetchTasks, createTask, updateTask } from "./redux/creators/tasks-creators";
import { State } from "./redux/reducers/tasks-reducer";

function mapStateToProps(state: State) {
    return {
        tasks: state.tasks,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, AnyAction>) {
    return {
        createTask: ({
            title,
            description,
        }: Pick<TaskInterface, "title" | "description">) =>
            dispatch(createTask({ title, description })),
        updateTask: (id: number, params: any) => dispatch(updateTask({ id, params })),
        fetchTasks: () => dispatch(asyncFetchTasks()),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const App: FunctionComponent<ReduxProps> = ({
    tasks,
    createTask,
    updateTask,
    fetchTasks,
}) => {
    const onCreateTask = ({ title, description }: any) => {
        createTask({ title, description });
    };

    const onStatusChange = (id: number, params: any) => {
        updateTask(id, params);
    };

    useEffect(() => {
        // @ts-ignore
        if (tasks.tasks.length === 0) fetchTasks();
        return () => {
            // @ts-ignore
            console.log("Unmounting component with ", tasks.tasks);
        };
    });
    // @ts-ignore
    if (tasks.tasks.length === 0) return <>loading</>;
    return (
        <div className="max-w-4xl mx-auto">
            <TasksPage
            // @ts-ignore
                tasks={tasks.tasks}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
