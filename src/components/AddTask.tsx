import { useState } from "react";
import { addTask } from "../api/add_task";
import { useTasksAPI } from "../contexts/TasksProvider";
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

const AddTaskDialog = ({ taskPriority }: { taskPriority: number }) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { fetchTasks } = useTasksAPI();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.target.taskName.value === "") return;

        addTask(e.target.taskName.value, taskPriority)
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
    };

    return (
        <DialogContent>
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={buttonDisabled}>
                            Add Task
                        </Button>
                    </DialogFooter>
                </Field>
            </form>
        </DialogContent>
    );
};

export default AddTaskDialog;
