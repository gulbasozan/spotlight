import {
    Circle,
    CopyCheck,
    CopyPlus,
    Square,
    SquareCheck,
    SquareCheckBig,
    SquareMinus,
    SquarePlus,
    SquareX,
} from "lucide-react";

import SubtaskBox from "./SubTaskBox";
import { deleteTask } from "../api/delete_task";
import { useTasksAPI } from "../contexts/TasksProvider";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
import type { Dispatch } from "react";
import { toggleTaskCompleteStatus } from "@/api/toggle_task_complete_status";

const TaskBox = ({
    task,
    index,
    isKingOfTasks,
}: {
    task: Task;
    index: number;
    isKingOfTasks: boolean;
}) => {
    return (
        <DropdownMenu>
            <div className="flex flex-col items-start justify-center w-full">
                <div className="m-2 p-2 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <DropdownMenuTrigger>
                            {task.completed_at ? (
                                <CompletedTask TaskText={task.text} />
                            ) : (
                                <UncompletedTask TaskText={task.text} />
                            )}
                        </DropdownMenuTrigger>
                        <TaskDropdownMenuContent
                            taskID={task.id}
                            taskPriority={task.priority}
                            index={index}
                            isKingOfTasks={isKingOfTasks}
                            isCompleted={task.completed_at}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {task.subtasks.length > 0 &&
                            task.subtasks.map((subtask: Subtask) => (
                                <SubtaskBox
                                    key={subtask.id}
                                    subtask={subtask}
                                    isTaskCompleted={task.completed_at}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </DropdownMenu>
    );
};

const UncompletedTask = ({ TaskText }: { TaskText: Task["text"] }) => {
    return (
        <div className="flex flex-row gap-2 items-center justify-start">
            <Square size={20} />
            <h1 className="font-bold text-2xl">{TaskText}</h1>
        </div>
    );
};

const CompletedTask = ({ TaskText }: { TaskText: Task["text"] }) => {
    return (
        <div className="flex flex-row gap-2 items-center justify-start">
            <SquareCheckBig size={20} color="#d1d5dc" />
            <h1 className="font-bold text-2xl text-gray-300 line-through">
                {TaskText}
            </h1>
        </div>
    );
};

const TaskDropdownMenuContent = ({
    taskID,
    taskPriority,
    isKingOfTasks,
    index,
    isCompleted,
}: {
    taskID: Task["id"];
    taskPriority: Task["priority"];
    isKingOfTasks: boolean;
    index: number;
    isCompleted: boolean;
}) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteTask(taskID)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };

    const handleMarkAsComplete = () => {
        toggleTaskCompleteStatus(taskID, isCompleted)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };

    return (
        <DropdownMenuContent>
            <DropdownMenuItem
                className={
                    isCompleted
                        ? "text-orange-500 focus:text-orange-500 focus:bg-orange-50"
                        : "text-green-500 focus:text-green-500 focus:bg-green-50"
                }
                onSelect={handleMarkAsComplete}
            >
                {isCompleted ? (
                    <SquareX color="#ff6900" />
                ) : (
                    <SquareCheck color="#00c950" />
                )}
                {`Mark as ${isCompleted ? "un" : ""}completed`}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <SquarePlus /> Task
                    </DropdownMenuItem>
                </DialogTrigger>
                <AddTaskDialog
                    taskPriority={taskPriority}
                    index={index}
                    isKingOfTasks={isKingOfTasks}
                />
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <SquarePlus /> Subtask
                    </DropdownMenuItem>
                </DialogTrigger>
                <AddSubtaskDialog taskID={taskID} />
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <CopyPlus /> Task Context
                    </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Add a task context</DialogTitle>
                        <DialogDescription>
                            Adding task context is not available right now,
                            sorry for the inconvenience, sir.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <DropdownMenuSeparator />

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
                            This action can be undone BUT, you know better than
                            me what a pain in the assto do so. Please think
                            twice, cut once, sir.
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
    );
};

export default TaskBox;
