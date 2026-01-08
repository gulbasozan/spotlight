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
    const setSubtask = (taskID: string, input: string, subtaskID: string) => {
        if (input === "") return;

        return setTasks((prev: Task[] | null) => {
            if (!prev) return null;

            let task = prev.find(({ ID }) => ID === taskID);

            if (!task?.subtasks) return null;
            let subtasks = task.subtasks;
            const taskIndex = prev.findIndex(({ ID }) => ID === taskID);

            if (!subtasks.length) subtasks = [{ ID: subtaskID, text: input }];

            if (subtasks.some(({ ID }) => ID === subtaskID))
                subtasks = subtasks.map((subtask) => {
                    if (subtask.ID === subtaskID) return { ...subtask, text: input };
                    return subtask;
                });
            else {
                subtasks = [...subtasks, { ID: subtaskID, text: input }];
            }

            task = { ...task, subtasks };

            return prev.toSpliced(taskIndex, 1, task);
        });
    };
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
