import AddTask from "./components/AddTask";
import TaskBox from "./components/TaskBox";
import { useTasks } from "./contexts/Tasks";

const Home = () => {
    const { tasks } = useTasks();

    return (
        <div className="flex w-full max-w-3xl p-5 flex-col justify-center items-center">
            {tasks ? (
                tasks.map((task) => <TaskBox key={task.ID} task={task} />)
            ) : (
                <AddTask taskPriority={1} />
            )}
        </div>
    );
};

export default Home;
