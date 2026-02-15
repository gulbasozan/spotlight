import { Circle, CopyPlus, SquareMinus, SquarePlus } from "lucide-react";

import SubtaskBox from "./SubTaskBox";
import AddTask from "./AddTask";
import AddSubtask from "./AddSubtask";
import DeleteButton from "./DeleteButton";
import { deleteTask } from "../api/delete_task";
import { useTasksAPI } from "../contexts/TasksProvider";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TaskBox = ({ task }: { task: Task }) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteTask(task.id)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };

    return (
        <DropdownMenu>
            <div className="flex flex-col items-start justify-center w-full">
                <div className="m-2 p-2 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-row gap-2 items-center justify-start">
                                <Circle size={20} />
                                <h1 className="font-bold text-2xl">
                                    {task.text}
                                </h1>
                            </div>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <SquarePlus /> Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CopyPlus /> Task Context
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <SquareMinus /> Delete Task
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    <div className="flex flex-col gap-2">
                        {task.subtasks.length > 0 &&
                            task.subtasks.map((subtask: Subtask) => (
                                <SubtaskBox
                                    key={subtask.id}
                                    subtask={subtask}
                                    taskID={task.id}
                                />
                            ))}
                        <AddSubtask taskID={task.id} />
                    </div>
                </div>
                <AddTask taskPriority={task.priority} />
            </div>
        </DropdownMenu>
    );
};

export default TaskBox;
