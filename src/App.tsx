import { FunctionComponent, useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import "./App.css";
import FlashMessage from "./components/FlashMessage";
import TasksPage from "./components/TasksPage";
import { TaskInterface } from "./components/types";
import {
    asyncFetchTasks,
    asyncCreateTask,
    asyncUpdateTask,
    fetchTasksStarted,
} from "./redux/creators/tasks-creators-server";
import { State } from "./redux/reducers/tasks-reducer";

type RootState = {
    tasks: State;
};

const mapStateToProps = (state: RootState) => {
    const { isLoading, tasks, error } = state.tasks;
    return {
        isLoading,
        tasks,
        error,
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
    error,
    createTask,
    fetchTasks: asyncFetchTasks,
    updateTask,
  
}) => {

    const dispatch = useDispatch()
    const onCreateTask = (params: TaskInterface) => {
        createTask(params);
    };

    const onStatusChange = (id: number, params: any) => {
        updateTask(id, params);
    };

    useEffect(() => {
        dispatch(fetchTasksStarted());
        // asyncFetchTasks()
    }, []);

    if (isLoading)
        return (
            <div className="flex text-center max-w-4xl mx-auto items-center justify-center h-max">
                <p className="font-bold text-2xls">Loading data...</p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto">
            {error && <FlashMessage message={error} />}
            {!tasks?.length && !isLoading && <div>No tasks where found</div>}
            <TasksPage
                tasks={tasks || []}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
