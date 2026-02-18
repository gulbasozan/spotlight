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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

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
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <CornerDownRight size={20} />
                            <h1 className="font-light text-md">
                                {taskContext.text}
                            </h1>
                        </div>
                    </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                variant="destructive"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <SquareMinus /> Delete Subtask
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action can be undone BUT, you know
                                    better than me what a pain in the assto do
                                    so. Please think twice, cut once, sir.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="outline">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    );
};

export default TaskContextBox;
