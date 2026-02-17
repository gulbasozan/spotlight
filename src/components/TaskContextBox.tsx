import { CornerDownRight, SquareMinus } from "lucide-react";
import { deleteTaskContext } from "../api/delete_task_context";
import { useTasksAPI } from "../contexts/TasksProvider";
import DeleteButton from "./DeleteButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const TaskContextBox = ({
    taskContext,
}: {
    taskID: string;
    taskContext: TaskContext;
}) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteTaskContext(taskContext.id)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };
    return (
        <DropdownMenu>
            <div className="ml-2 px-2">
                <div className="flex flex-row justify-between items-center">
                    <DropdownMenuTrigger>
                        {" "}
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <CornerDownRight size={20} />
                            <h1 className="font-light text-md">
                                {taskContext.text}
                            </h1>
                        </div>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        <SquareMinus /> Delete Context
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    );
};

export default TaskContextBox;
