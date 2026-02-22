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
import { getPriorityNumber } from "@/lib/utils";

const AddTaskDialog = ({
    taskPriority,
    index,
}: {
    taskPriority?: number;
    index: number;
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { fetchTasks, tasks } = useTasksAPI();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (e.target.taskName.value === "") return;

        // get upper (taskPriority) and lower tasks for priority boundaries
        // lower priority has higher index bc order is ascending in priority
        const lowerTask = tasks.length > 1 ? tasks.at(index + 1) : null; // thus index+1
        console.log("LOWER TASK", lowerTask);
        const newTaskPriority = getPriorityNumber(
            taskPriority,
            lowerTask?.priority,
        );
        console.log("TASK PRIORITY", newTaskPriority);

        addTask(e.target.taskName.value, newTaskPriority)
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
