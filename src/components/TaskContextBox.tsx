import { CornerDownRight } from "lucide-react";
import { deleteTaskContext } from "../api/delete_task_context";
import { useTasksAPI } from "../contexts/TasksProvider";
import DeleteButton from "./DeleteButton";

const TaskContextBox = ({
    taskContext,
}: {
    taskID: string;
    taskContext: TaskContext;
}) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteTaskContext(taskContext.id).then((res) => {
            if (res.error) throw res.error;
        }).then(() => fetchTasks()).catch(e => console.log(e))
    }
    return (
        <div className="ml-2 px-2">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <CornerDownRight size={20} />
                    <h1 className="font-light text-md">{taskContext.text}</h1>
                </div>
                <DeleteButton handleClick={handleDelete} />
            </div>
        </div>
    );
};

export default TaskContextBox;
