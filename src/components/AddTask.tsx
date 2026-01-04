import { Plus } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTasks } from "../contexts/Tasks";

const AddTask = () => {
    const [openDialouge, setOpenDialouge] = useState(false);

    const handleClick = (e:any) => {
        e.preventDefault();

        setOpenDialouge(true);
    };

    return (
        <>
            {openDialouge ? (
                <AddTaskDialouge setOpenDialouge={setOpenDialouge} />
            ) : (
                <div onClick={handleClick}>
                    <p>+ Add Task</p>
                </div>
            )}
        </>
    );
};

const AddTaskDialouge = ({
    setOpenDialouge,
}: {
    setOpenDialouge: Dispatch<SetStateAction<boolean>>;
}) => {
    const [taskName, setTaskName] = useState("");

    const { setTask } = useTasks();

    const handleClick = () => {
        setTask(taskName, taskName);
        setOpenDialouge(false);
    };

    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <input
                placeholder="Enter task name"
                onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="bg-blue-300 rounded-md p-1" onClick={handleClick}>
                <Plus size={20} color="white" />
            </div>
        </div>
    );
};

export default AddTask;
