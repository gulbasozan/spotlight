declare interface Task {
    id: string;
    created_at: date;
    text: string;
    subtasks: Subtask[] | never[];
    priority: number;
    completed: boolean;
    completed_at: date;
}

declare interface Subtask {
    id: string;
    created_at: date;
    text: string;
    task_id: string;
    task_contexts: TaskContext[] | never[];
    completed: boolean;
    completed_at: date;
}

declare interface TaskContext {
    id: string;
    created_at: date;
    text: string;
    subtask_id: string;
}

declare interface TasksReactContext {
    tasks: Task[] | null;
    setTask: SetStateAction<Task | null> | null;
    setSubtask: Dispatch<Subtask> | null;
    setTaskContext: Dispatch<TaskContext> | null;
}

declare interface TasksContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
}

declare interface UserCredentials {
    username: string;
    password: string;
}

declare interface SessionContext_T {
    session: Session | null;
    setSession: Dispatch<Session>;
}
