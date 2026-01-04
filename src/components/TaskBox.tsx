import { Circle } from "lucide-react";

import SubtaskBox from "./SubTaskBox";
import AddTask from "./AddTask";

const TaskBox = ({ task }: { task: Task }) => {
    return (
        <div className="flex flex-col items-start justify-center w-full">
            <div className="m-2 p-2 w-full">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <Circle size={20} />
                    <h1 className="font-bold text-2xl">{`${task.text} (${task.priority})`}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <SubtaskBox />
                </div>
            </div>
            <AddTask taskPriority={task.priority} />
        </div>
    );
};

export default TaskBox;
