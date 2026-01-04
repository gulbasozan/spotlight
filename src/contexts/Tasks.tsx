import { createContext, useContext, useState, type ReactNode } from "react";

const INITIAL_TASKS_CONTEXT = {
    tasks: null,
    setTask: null,
    setSubtask: null,
    setTaskContext: null,
};

const TasksContext = createContext<TasksReactContext>(INITIAL_TASKS_CONTEXT);

const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    const setTask = (taskID: string, value: string) => {
        return setTasks((prev: Task[] | null) => {
            if (!prev)
                return [{ ID: value, text: value, subtasks: [], taskContexts: [] }];

            if (prev.find(({ ID }) => ID === taskID))
                return prev.map((taskP) => {
                    if (taskP.ID === taskID) return { ...taskP, text: value, ID: taskID };
                    return taskP;
                });

            return [
                ...prev,
                { ID: value, text: value, subtasks: [], taskContexts: [] },
            ];
        });
    };

    //TBI
    const setSubtask = () => { };
    const setTaskContext = () => { };

    return (
        <TasksContext.Provider
            value={{ tasks, setTask, setSubtask, setTaskContext }}
        >
            {children}
        </TasksContext.Provider>
    );
};

// Check fast refresh??
export const useTasks = () => {
    return useContext(TasksContext);
};

export default TasksProvider;
