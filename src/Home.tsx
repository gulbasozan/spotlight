import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskBox from "./components/TaskBox";
// import { useTasks } from "./contexts/Tasks";
import { getTasks } from "./api/get_tasks";
import { useTasksAPI } from "./contexts/TasksProvider";

const Home = () => {
    // const { tasks } = useTasks();

    // const [loading, setLoading] = useState(false);
    // const [tasks, setTasks] = useState<Task[] | null>(null);

    const { tasks, loading, error } = useTasksAPI();

    useEffect(() => {
        // setdeclare Loading(true);


        // getTasks()
        //     // Fix error handling to include proper error rendering on frontend
        //     .then(({ data, error }) => (error ? console.log(error) : setTasks(data)))
        //     .then(() => setLoading(false));
    }, []);

    return loading ? (
        <p>LOADING...</p>
    ) : !error ? (
        <div className="flex w-full max-w-3xl p-5 flex-col justify-center items-center">
            {tasks ? (
                tasks.map((task) => <TaskBox key={task.id} task={task} />)
            ) : (
                <AddTask taskPriority={1} />
            )}
        </div>
    ) : (<p>Something went wrong</p>);
};

export default Home;
