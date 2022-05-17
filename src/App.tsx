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
import { filterTasks } from "./redux/creators/tasks-creators-ui";
import { getGroupedAndFilteredTasks } from "./redux/reducers/tasks-reducer";
import { RootState } from "./redux/types/shared";

const mapStateToProps = (state: RootState) => {
    const { isLoading, error } = state.tasks;

    return {
        isLoading,
        tasks: getGroupedAndFilteredTasks(state),
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
    const dispatch = useDispatch();

    const onCreateTask = (params: TaskInterface) => {
        createTask(params);
    };

    const onStatusChange = (id: number, params: any) => {
        updateTask(id, params);
    };

    const onSearch = (searchTerm: string) => {
        dispatch(filterTasks(searchTerm));
    };

    useEffect(() => {
        dispatch(fetchTasksStarted());
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
            <TasksPage
                tasks={tasks || []}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
                onSearch={onSearch}
            />
            {!tasks?.length && !isLoading && <div>No tasks where found</div>}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
