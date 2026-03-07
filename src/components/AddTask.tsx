import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { addTask } from "../api/add_task";
import { useTasksAPI } from "../contexts/TasksProvider";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getPriorityNumber } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";

const AddTaskDialog = ({
    taskPriority,
    index,
    isKingOfTasks = false,
}: {
    taskPriority: number;
    index: number;
    isKingOfTasks?: boolean;
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [yieldThrone, setYieldThrone] = useState(false);
    const [priorityLimitError, setPriorityLimitError] = useState(false);
    const [startFetch, setStartFetch] = useState(false);

    const { fetchTasks, tasks } = useTasksAPI();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.target.taskName.value === "") return;

        const prioritySortedTasks = tasks.sort(
            (a, b) => b.priority - a.priority,
        );

        // get upper (taskPriority) and lower tasks for priority boundaries
        // lower priority has higher index bc order is ascending in priority
        const lowerTask =
            tasks.length > 1 ? prioritySortedTasks.at(index + 1) : null; // thus index+1

        const upperBoundary = !yieldThrone ? taskPriority : null;
        const newTaskPriority = getPriorityNumber(
            upperBoundary,
            yieldThrone ? taskPriority : lowerTask?.priority,
        );

        if (newTaskPriority === lowerTask?.priority)
            return setPriorityLimitError(true);

        setStartFetch(true);
        addTask(e.target.taskName.value, newTaskPriority)
            .then(() => fetchTasks())
            .catch((e) => console.log(e))
            .finally(() => setStartFetch(false));
    };

    return (
        <DialogContent>
            {priorityLimitError && <AlertDestructive />}
            <DialogTitle>
                <DialogHeader>Add a task</DialogHeader>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="task-name">Task Name</Label>
                    <Input
                        id="taskName"
                        name="taskName"
                        onFocus={(e) =>
                            e.target.value === "" && setButtonDisabled(true)
                        }
                        onChange={(e) =>
                            e.target.value !== ""
                                ? setButtonDisabled(false)
                                : setButtonDisabled(true)
                        }
                    />
                    <DialogFooter className="w-full sm:justify-between items-center">
                        {isKingOfTasks && (
                            <YieldThrone setYieldThrone={setYieldThrone} />
                        )}
                        <div className="flex sm:justify-end gap-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            {startFetch ? (
                                <Button disabled>
                                    Adding Task
                                    <Spinner data-icon="inline-start" />
                                </Button>
                            ) : (
                                <Button type="submit" disabled={buttonDisabled}>
                                    Add Task
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </Field>
            </form>
        </DialogContent>
    );
};

const YieldThrone = ({
    setYieldThrone,
}: {
    setYieldThrone: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div className="flex flex-row gap-2">
            <FieldLabel htmlFor="yts-s">Yield Throne</FieldLabel>
            <Switch
                id="yts"
                name="yts"
                onCheckedChange={(checked) => setYieldThrone(checked)}
            />
            {/* Yeild Throne Switch */}
        </div>
    );
};

export function AlertDestructive() {
    return (
        <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>Task cannot be added</AlertTitle>
            <AlertDescription>
                You have reached the maximum amount of tasks you can add under
                this specific task. Please change your tasks priority (higher or
                lower) and try again.
            </AlertDescription>
        </Alert>
    );
}

export default AddTaskDialog;
