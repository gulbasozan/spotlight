import { useState } from "react";
import { useTasksAPI } from "../contexts/TasksProvider";
import { addTaskContext } from "../api/add_task_context";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const AddTaskContextDialog = ({
    subtaskID,
}: {
    taskID: string;
    subtaskID: string;
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [startFetch, setStartFetch] = useState(false);

    const { fetchTasks } = useTasksAPI();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.target.taskContext.value === "") return;

        setStartFetch(true);
        addTaskContext(e.target.taskContext.value, subtaskID)
            .then(() => fetchTasks())
            .catch((e) => console.log(e))
            .finally(() => setStartFetch(false));
    };

    return (
        <DialogContent>
            <DialogTitle>
                <DialogHeader>Add a context</DialogHeader>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="taskContext">Context</Label>
                    <Input
                        id="taskContext"
                        name="taskContext"
                        onFocus={(e) =>
                            e.target.value === "" && setButtonDisabled(true)
                        }
                        onChange={(e) =>
                            e.target.value !== ""
                                ? setButtonDisabled(false)
                                : setButtonDisabled(true)
                        }
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {startFetch ? (
                            <Button disabled>
                                Adding Context
                                <Spinner data-icon="inline-start" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={buttonDisabled}>
                                Add Context
                            </Button>
                        )}
                    </DialogFooter>
                </Field>
            </form>
        </DialogContent>
    );
};

export default AddTaskContextDialog;
