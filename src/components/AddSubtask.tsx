import { useState } from "react";

import { useTasksAPI } from "../contexts/TasksProvider";
import { addSubtask } from "../api/add_subtask";
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

const AddSubtaskDialog = ({ taskID }: { taskID: string }) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [startFetch, setStartFetch] = useState(false);

    const { fetchTasks } = useTasksAPI();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.target.subtaskName.value === "") return;

        setStartFetch(true);
        addSubtask(e.target.subtaskName.value, taskID)
            .then(() => fetchTasks())
            .catch((e) => console.log(e))
            .finally(() => setStartFetch(false));
    };

    return (
        <DialogContent>
            <DialogTitle>
                <DialogHeader>Add a subtask</DialogHeader>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="task-name">Subtask Name</Label>
                    <Input
                        id="subtaskName"
                        name="subtaskName"
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
                                Adding Subtask
                                <Spinner data-icon="inline-start" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={buttonDisabled}>
                                Add Subtask
                            </Button>
                        )}
                    </DialogFooter>
                </Field>
            </form>
        </DialogContent>
    );
};

export default AddSubtaskDialog;
