import { FunctionComponent, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { TaskInterface } from "./components/types";
import {
    asyncFetchTasks,
    asyncCreateTask,
    updateTask,
    asyncUpdateTask,
} from "./redux/creators/tasks-creators-server";
import { State } from "./redux/reducers/tasks-reducer";

type RootState = {
    tasks: State;
};

const mapStateToProps = (state: RootState) => {
    const { isLoading, tasks } = state.tasks;
    return {
        isLoading,
        tasks,
    };
};

function mapDispatchToProps(dispatch: ThunkDispatch<RootState, void, AnyAction>) {
    return {
        createTask: (params: TaskInterface) => dispatch(asyncCreateTask(params)),
        updateTask: (id: number, params: TaskInterface) =>
            dispatch(asyncUpdateTask({ id, params })),
        fetchTasks: () => dispatch(asyncFetchTasks()),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const App: FunctionComponent<ReduxProps> = ({
    tasks,
    isLoading,
    createTask,
    updateTask,
    fetchTasks,
}) => {
    const onCreateTask = (params: TaskInterface) => {
        createTask(params);
    };

    const onStatusChange = (id: number, params: any) => {
        updateTask(id, params);
    };

    useEffect(() => {
        if (!tasks.length) fetchTasks();
    });

    if (isLoading)
        return (
            <div className="flex text-center max-w-4xl mx-auto items-center justify-center h-max">
                <p className="font-bold text-2xls">Loading data...</p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto">
            <TasksPage
                tasks={tasks}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
