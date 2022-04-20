import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { createTask, updateTask } from "./redux/creators/tasks-creators";

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

    const onStatusChange = (id:number, params:any)=>{
        dispatch(updateTask({id, params}))
    }

    return (
        <div className="max-w-4xl mx-auto">
            <TasksPage tasks={tasks} onCreateTask={onCreateTask} onStatusChange={onStatusChange} />
        </div>
    );
};

export default connect(mapStateToProps)(App);
