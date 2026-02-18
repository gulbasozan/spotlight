import { CopyPlus, Minus, SquareMinus, SquarePlus } from "lucide-react";

import TaskContextBox from "./TaskContextBox.tsx";
import AddTaskContext from "./AddTaskContext.tsx";
import DeleteButton from "./DeleteButton.tsx";

import { useTasksAPI } from "../contexts/TasksProvider.tsx";
import { deleteSubtask } from "../api/delete_subtask.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";
import { Dialog, DialogTrigger } from "./ui/dialog.tsx";
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
} from "./ui/alert-dialog.tsx";
import AddTaskContextDialog from "./AddTaskContext.tsx";

const SubtaskBox = ({
    subtask,
    taskID,
}: {
    subtask: Subtask;
    taskID: string;
}) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteSubtask(subtask.id)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };
    return (
        <DropdownMenu>
            <div className="ml-2 mr-2 p-2">
                <DropdownMenuTrigger>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <Minus size={20} />
                            <h1 className="font-medium text-lg">
                                {subtask.text}
                            </h1>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <CopyPlus /> Subtask Context
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <AddTaskContextDialog
                            taskID={subtask.task_id}
                            subtaskID={subtask.id}
                        />
                    </Dialog>

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
                <div className="flex flex-col gap-2 ml-2 p-2">
                    {subtask.task_contexts.length > 0 &&
                        subtask.task_contexts.map((taskContext) => {
                            return (
                                <TaskContextBox
                                    key={taskContext.id}
                                    taskID={taskID}
                                    taskContext={taskContext}
                                />
                            );
                        })}
                </div>
            </div>
        </DropdownMenu>
    );
};

export default SubtaskBox;
