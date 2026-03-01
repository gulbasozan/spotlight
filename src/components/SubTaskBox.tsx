import {
    CopyCheck,
    CopyMinus,
    CopyPlus,
    CopyX,
    MessageSquarePlus,
    Minus,
    Plus,
    SquareMinus,
} from "lucide-react";

import TaskContextBox from "./TaskContextBox.tsx";

import { useTasksAPI } from "../contexts/TasksProvider.tsx";
import { deleteSubtask } from "../api/delete_subtask.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
import { toggleSubtaskCompleteStatus } from "@/api/toggle_subtask_complete_status.ts";

const SubtaskBox = ({
    subtask,
    isTaskCompleted,
}: {
    subtask: Subtask;
    isTaskCompleted: boolean;
}) => {
    return (
        <DropdownMenu>
            <div className="ml-2 mr-2 p-2">
                <DropdownMenuTrigger>
                    {subtask.completed_at || isTaskCompleted ? (
                        <CompletedSubtask subtaskText={subtask.text} />
                    ) : (
                        <UncompletedSubtask subtaskText={subtask.text} />
                    )}
                </DropdownMenuTrigger>
                <SubtaskDropdownContent
                    subtaskID={subtask.id}
                    taskID={subtask.task_id}
                    isCompleted={subtask.completed_at}
                />
                <div className="flex flex-col gap-2 ml-2 p-2">
                    {subtask.task_contexts.length > 0 &&
                        subtask.task_contexts.map((taskContext) => {
                            return (
                                <TaskContextBox
                                    key={taskContext.id}
                                    taskContext={taskContext}
                                    isCompletedSubtask={
                                        !subtask.completed_at &&
                                        !isTaskCompleted
                                    }
                                />
                            );
                        })}
                </div>
            </div>
        </DropdownMenu>
    );
};

const UncompletedSubtask = ({
    subtaskText,
}: {
    subtaskText: Subtask["text"];
}) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Minus size={20} />
                <h1 className="font-medium text-lg">{subtaskText}</h1>
            </div>
        </div>
    );
};

const CompletedSubtask = ({
    subtaskText,
}: {
    subtaskText: Subtask["text"];
}) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Plus size={20} color="#d1d5dc" />
                <h1 className="font-medium text-lg text-gray-300 line-through">
                    {subtaskText}
                </h1>
            </div>
        </div>
    );
};

const SubtaskDropdownContent = ({
    subtaskID,
    taskID,
    isCompleted,
}: {
    subtaskID: Subtask["id"];
    taskID: Subtask["task_id"];
    isCompleted: boolean;
}) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteSubtask(subtaskID)
            .then((res) => {
                if (res.error) throw res.error;
            })
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };

    const handleMarkAsComplete = () => {
        toggleSubtaskCompleteStatus(subtaskID, isCompleted)
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
                    <CopyX color="#ff6900" />
                ) : (
                    <CopyCheck color="#00c950" />
                )}
                {`Mark as ${isCompleted ? "un" : ""}completed`}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <MessageSquarePlus /> Subtask Context
                    </DropdownMenuItem>
                </DialogTrigger>
                <AddTaskContextDialog taskID={taskID} subtaskID={subtaskID} />
            </Dialog>

            <DropdownMenuSeparator />

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <CopyMinus /> Delete Subtask
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

export default SubtaskBox;
