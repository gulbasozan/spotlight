declare interface Task {
    ID: string;
    text: string;
    subtasks: Subtask[] | never[];
    taskContexts: TaskContext[] | never[];
}

declare interface Subtask {
    ID: string;
    text: string;
}

declare interface TaskContext {
    ID: string;
    text: string;
}

declare interface TasksReactContext {
    tasks: Task[] | null;
    setTask: SetStateAction<Task | null> | null;
    setSubtask: Dispatch<Subtask> | null;
    setTaskContext: Dispatch<TaskContext> | null;
}
