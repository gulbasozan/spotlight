import { useEffect } from "react";
import TaskBox from "../components/TaskBox";
import { useSession } from "../contexts/SessionProvider";
import { useTasksAPI } from "../contexts/TasksProvider";
import { useNavigate } from "react-router";
import AddTaskDialog from "../components/AddTask";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PRIORITY_SORT_START_ANCHOR = 1000;

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
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <TaskBox
                        key={task.id}
                        index={index}
                        task={task}
                        isKingOfTasks={index === 0}
                    />
                ))
            ) : (
                <Dialog>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1>Start by adding a task.</h1>
                        <DialogTrigger>
                            <Button asChild variant="outline">
                                <h2>Add a Task</h2>
                            </Button>
                        </DialogTrigger>
                        <AddTaskDialog
                            index={0}
                            taskPriority={PRIORITY_SORT_START_ANCHOR}
                        />
                    </div>
                </Dialog>
            )}
        </div>
    ) : (
        <p>Something went wrong</p>
    );
};

export default Home;
