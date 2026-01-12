import { Minus } from "lucide-react";

import TaskContextBox from "./TaskContextBox.tsx";
import { useState } from "react";
import AddSubtask from "./AddSubtask.tsx";
import AddTaskContext from "./AddTaskContext.tsx";

const SubtaskBox = ({
    subtask,
    taskID,
    taskContexts,
}: {
    subtask: Subtask;
    taskID: string;
    taskContexts: TaskContext[];
}) => {
    return (
        <div className="ml-2 p-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Minus size={20} />
                <h1 className="font-medium text-lg">{subtask.text}</h1>
            </div>
            <div className="flex flex-col gap-2 ml-2 p-2">
                {taskContexts.length > 0 &&
                    taskContexts.some(({ subtaskID }) => subtaskID === subtask.ID) &&
                    taskContexts.map((taskContext) => {
                        if (taskContext.subtaskID !== subtask.ID) return null;
                        return (
                            <TaskContextBox
                                key={taskContext.ID}
                                taskID={taskID}
                                taskContext={taskContext}
                            />
                        );
                    })}
                <AddTaskContext taskID={taskID} subtaskID={subtask.ID} />
            </div>
        </div>
    );
};

export default SubtaskBox;
