import { CornerDownRight, SquareMinus } from "lucide-react";
import { deleteTaskContext } from "../api/delete_task_context";
import { useTasksAPI } from "../contexts/TasksProvider";
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
    isCompletedSubtask,
}: {
    taskContext: TaskContext;
    isCompletedSubtask: boolean;
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
                        {isCompletedSubtask ? (
                            <CompletedSubtaskContext
                                taskContextText={taskContext.text}
                            />
                        ) : (
                            <UncompletedSubtaskContext
                                taskContextText={taskContext.text}
                            />
                        )}
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

const UncompletedSubtaskContext = ({
    taskContextText,
}: {
    taskContextText: TaskContext["text"];
}) => {
    return (
        <div className="flex flex-row gap-2 items-center justify-start">
            <CornerDownRight size={20} color="#d1d5dc" />
            <h1 className="font-light text-md text-gray-300 line-through">
                {taskContextText}
            </h1>
        </div>
    );
};

const CompletedSubtaskContext = ({
    taskContextText,
}: {
    taskContextText: TaskContext["text"];
}) => {
    return (
        <div className="flex flex-row gap-2 items-center justify-start">
            <CornerDownRight size={20} />
            <h1 className="font-light text-md">{taskContextText}</h1>
        </div>
    );
};

export default TaskContextBox;
