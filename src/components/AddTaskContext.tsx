import { Plus } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTasksAPI } from "../contexts/TasksProvider";
import { addTaskContext } from "../api/add_task_context";

const AddTaskContext = ({
    taskID,
    subtaskID,
}: {
    taskID: string;
    subtaskID: string;
}) => {
    const [openDialouge, setOpenDialouge] = useState(false);

    const handleClick = (e: any) => {
        e.preventDefault();

        setOpenDialouge(true);
    };

    return (
        <div className="pl-2 ml-2">
            {openDialouge ? (
                <AddTaskContextDialouge
                    setOpenDialouge={setOpenDialouge}
                    taskID={taskID}
                    subtaskID={subtaskID}
                />
            ) : (
                <div onClick={handleClick}>
                    <p>+ Add Task Context</p>
                </div>
            )}
        </div>
    );
};

const AddTaskContextDialouge = ({
    setOpenDialouge,
    taskID,
    subtaskID,
}: {
    setOpenDialouge: Dispatch<SetStateAction<boolean>>;
    taskID: string;
    subtaskID: string;
}) => {
    const [taskContextName, setTaskContextName] = useState("");

    const { fetchTasks } = useTasksAPI();

    const handleClick = () => {
        addTaskContext(taskContextName, subtaskID).then(() => fetchTasks()).catch(e => console.log(e))
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

export default AddTaskContext;
