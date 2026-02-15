import { useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskBox from "../components/TaskBox";
import { useSession } from "../contexts/SessionProvider";
import { useTasksAPI } from "../contexts/TasksProvider";
import { useNavigate } from "react-router";

const Home = () => {
    const { tasks, loading, error } = useTasksAPI();

    const { session } = useSession();

    const navigate = useNavigate();

    useEffect(() => {
        if (!session) navigate("/sign-in");
    }, [session, navigate]);

    return loading ? (
        <p>LOADING...</p>
    ) : !error ? (
        <div className="flex w-full max-w-3xl p-5 flex-col justify-center items-center">
            {tasks ? (
                tasks.map((task) => <TaskBox key={task.id} task={task} />)
            ) : (
                <AddTask taskPriority={1} />
            )}
            <p>You are on the home page.</p>
        </div>
    ) : (
        <p>Something went wrong</p>
    );
};

export default Home;
