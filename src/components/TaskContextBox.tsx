import { CornerDownRight } from "lucide-react";
import AddTaskContext from "./AddTaskContext";

const TaskContextBox = ({
    taskID,
    taskContext,
}: {
    taskID: string;
    taskContext: TaskContext;
}) => {
    return (
        <div className="ml-2 px-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <CornerDownRight size={20} />
                <h1 className="font-light text-md">{taskContext.text}</h1>
            </div>
        </div>
    );
};

export default TaskContextBox;
