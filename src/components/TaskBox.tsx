import { Circle } from "lucide-react";

import SubtaskBox from "./SubTaskBox";
import AddTask from "./AddTask";
import AddSubtask from "./AddSubtask";
import DeleteButton from "./DeleteButton";
import { deleteTask } from "../api/delete_task";
import { useTasksAPI } from "../contexts/TasksProvider";

const TaskBox = ({ task }: { task: Task }) => {
    const { fetchTasks } = useTasksAPI();

    const handleDelete = () => {
        deleteTask(task.id).then((res) => {
            if (res.error) throw res.error;
        }).then(() => fetchTasks()).catch(e => console.log(e))
    }

    return (
        <div className="flex flex-col items-start justify-center w-full">
            <div className="m-2 p-2 w-full">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center justify-start">
                        <Circle size={20} />
                        <h1 className="font-bold text-2xl">{`${task.text} (${task.priority})`}</h1>
                    </div>
                    <DeleteButton handleClick={handleDelete} />
                </div>
                <div className="flex flex-col gap-2">
                    {task.subtasks.length > 0 &&
                        task.subtasks.map((subtask: Subtask) => (
                            <SubtaskBox
                                key={subtask.id}
                                subtask={subtask}
                                taskID={task.id}
                            />
                        ))}
                    <AddSubtask taskID={task.id} />
                </div>
            </div>
            <AddTask taskPriority={task.priority} />
        </div>
    );
};

export default TaskBox;
