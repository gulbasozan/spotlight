import { type Dispatch, type SetStateAction, useState } from "react";

import { Plus } from "lucide-react";

import { useTasksAPI } from "../contexts/TasksProvider";
import { addSubtask } from "../api/add_subtask";

const AddSubtask = ({ taskID }: { taskID: string }) => {
    const [openDialouge, setOpenDialouge] = useState(false);
    const handleClick = (e: any) => {
        e.preventDefault();

        setOpenDialouge(true);
    };

    return (
        <div className="pl-2 ml-2">
            {openDialouge ? (
                <AddSubtaskDialouge
                    setOpenDialouge={setOpenDialouge}
                    taskID={taskID}
                />
            ) : (
                <div onClick={handleClick}>
                    <p>+ Add Subtask</p>
                </div>
            )}
        </div>
    );
};

const AddSubtaskDialouge = ({
    setOpenDialouge,
    taskID,
}: {
    setOpenDialouge: Dispatch<SetStateAction<boolean>>;
    taskID: string;
}) => {
    const [subtaskName, setSubtaskName] = useState("");

    const { fetchTasks } = useTasksAPI();

    const handleClick = () => {
        addSubtask(subtaskName, taskID)
            .then(() => fetchTasks())
            .catch((e) => console.log(e));
        setOpenDialouge(false);
    };
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <input
                placeholder="Enter subtask"
                onChange={(e) => setSubtaskName(e.target.value)}
            />
            <div className="bg-blue-300 rounded-md p-1" onClick={handleClick}>
                <Plus size={20} color="white" />
            </div>
        </div>
    );
};

export default AddSubtask;
