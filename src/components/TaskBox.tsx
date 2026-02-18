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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
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
import AddTaskDialog from "./AddTask";
import AddSubtaskDialog from "./AddSubtask";

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <SquarePlus /> Task
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <AddTaskDialog taskPriority={1} />
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <SquarePlus /> Subtask
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <AddSubtaskDialog taskID={task.id} />
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <CopyPlus /> Task Context
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <DialogContent showCloseButton={false}>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add a task context
                                    </DialogTitle>
                                    <DialogDescription>
                                        Adding task context is not available
                                        right now, sorry for the inconvenience,
                                        sir.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <SquareMinus /> Delete Task
                                </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action can be undone BUT, you know
                                        better than me what a pain in the assto
                                        do so. Please think twice, cut once,
                                        sir.
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
                    <div className="flex flex-col gap-2">
                        {task.subtasks.length > 0 &&
                            task.subtasks.map((subtask: Subtask) => (
                                <SubtaskBox
                                    key={subtask.id}
                                    subtask={subtask}
                                    taskID={task.id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </DropdownMenu>
    );
};

export default TaskBox;
