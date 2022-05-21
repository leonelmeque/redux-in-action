import { ChangeEvent, FunctionComponent, useEffect } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import "./App.css";
import FlashMessage from "./components/FlashMessage";
import Header from "./components/Header";
import TasksPage from "./components/TasksPage";
import { TaskInterface } from "./components/types";
import { fetchProjects } from "./lib/api";
import { setCurrentProjectId } from "./redux/creators/page-creators-ui";
import { asyncfetchProjects } from "./redux/creators/projects-creators-server";
import {
    asyncFetchTasks,
    asyncCreateTask,
    asyncUpdateTask,
    fetchTasksStarted,
} from "./redux/creators/tasks-creators-server";
import { filterTasks } from "./redux/creators/tasks-creators-ui";
import { getGroupedAndFilteredTasks, getProjects } from "./redux/selectors";
import { RootState } from "./redux/types/shared";

const mapStateToProps = (state: RootState) => {
    const { isLoading, error } = state.projects;

    return {
        isLoading,
        projects: getProjects(state),
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
        fetchProjects: () => dispatch(asyncfetchProjects()),
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
    fetchProjects,
    updateTask,
    projects,
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

    const onCurrentProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrentProjectId(Number(e.target.value)));
    };

    useEffect(() => {
        fetchProjects()
    }, []);
    console.log(tasks)
    return (
        <div className="max-w-4xl mx-auto">
            {error && <FlashMessage message={error} />}
            <Header
                onSearch={onSearch}
                projects={projects}
                toggleForm={() => {}}
                onCurrentProjectChange={onCurrentProjectChange}
            />
            <TasksPage
                tasks={tasks || []}
                onCreateTask={onCreateTask}
                onStatusChange={onStatusChange}
                onSearch={onSearch}
                isLoading={isLoading}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
