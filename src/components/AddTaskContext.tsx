import { Plus } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
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

const AddTaskContextDialog = ({
    taskID,
    subtaskID,
}: {
    taskID: string;
    subtaskID: string;
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { fetchTasks } = useTasksAPI();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.taskContext.value === "") return;

        addTaskContext(e.target.taskContext.value, subtaskID)
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
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
                        <Button type="submit" disabled={buttonDisabled}>
                            Add Context
                        </Button>
                    </DialogFooter>
                </Field>
            </form>
        </DialogContent>
    );
};

const AddTaskContextDialouge = ({
    setOpenDialouge,
    subtaskID,
}: {
    setOpenDialouge: Dispatch<SetStateAction<boolean>>;
    taskID: string;
    subtaskID: string;
}) => {
    const [taskContextName, setTaskContextName] = useState("");

    const { fetchTasks } = useTasksAPI();

    const handleClick = () => {
        setOpenDialouge(false);
    };
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <input
                placeholder="Enter task context"
                onChange={(e) => setTaskContextName(e.target.value)}
            />
            <div className="bg-blue-300 rounded-md p-1" onClick={handleClick}>
                <Plus size={20} color="white" />
            </div>
        </div>
    );
};

export default AddTaskContextDialog;
