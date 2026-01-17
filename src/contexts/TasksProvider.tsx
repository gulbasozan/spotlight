import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getTasks } from "../api/get_tasks";

interface TasksContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data, error } = await getTasks();

            if (error) { setError(error.message); throw error }

            setTasks(data)
        } catch (error) {
            console.log(error);
            setTasks([])
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTasks() }, [])

    return (
        <TasksContext.Provider value={{ tasks, loading, error, fetchTasks }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasksAPI = () => {
    const context = useContext(TasksContext)

    // just to get by from ts linter error
    if (context === undefined) throw new Error("useTasksAPI must be used within TasksProvider");

    return context;
}

export default TasksProvider;
