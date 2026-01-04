import { Circle } from "lucide-react";

import SubtaskBox from "./SubTaskBox";
import AddTask from "./AddTask";

const TaskBox = ({ task }: { task: Task }) => {
    return (
        <>
            <div className="m-2 p-2 w-full">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <Circle size={20} />
                    <h1 className="font-bold text-2xl">{task.text}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <SubtaskBox />
                    <SubtaskBox />
                    <SubtaskBox />
                </div>
            </div>
            <AddTask />
        </>
    );
};

export default TaskBox;
