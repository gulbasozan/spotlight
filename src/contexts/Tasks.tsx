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

    const updatePriorities = (tasks: Task[], newTaskPriority: number) => {
        return tasks.map((task: Task) => {
            if (task.priority >= newTaskPriority) {
                return { ...task, priority: task.priority + 1 };
            }
            return task;
        });
    };

    const setTask = (taskID: string, value: string, priority: number) => {
        if (value === "") return;

        return setTasks((prev: Task[] | null) => {
            if (!prev)
                return [
                    { ID: value, text: value, priority, subtasks: [], taskContexts: [] },
                ];

            if (prev.find(({ ID }) => ID === taskID))
                return prev.map((taskP) => {
                    if (taskP.ID === taskID)
                        return { ...taskP, text: value, ID: taskID, priority };
                    return taskP;
                });

            let updatedTasks = updatePriorities(prev, priority);

            updatedTasks = [
                ...updatedTasks,
                { ID: value, text: value, priority, subtasks: [], taskContexts: [] },
            ];

            return updatedTasks.sort((a, b) => b.priority - a.priority);
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
