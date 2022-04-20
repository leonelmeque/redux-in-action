import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { createTask } from "./redux/creators/tasks-creators";

function mapStateToProps(state: any) {
    const { tasks } = state;
    return {
        tasks,
    };
}

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const App: FunctionComponent<ReduxProps> = ({ tasks:{tasks}, dispatch }) => {
    const onCreateTask = ({ title, description }: any) => {
        dispatch(createTask({ title, description }));
    };

    console.log(tasks)
    return (
        <div className="App">
            <TasksPage tasks={tasks} onCreateTask={onCreateTask} />
        </div>
    );
};

export default connect(mapStateToProps)(App);
