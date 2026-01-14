import { Minus } from "lucide-react";

import TaskContextBox from "./TaskContextBox.tsx";
import { useState } from "react";
import AddSubtask from "./AddSubtask.tsx";
import AddTaskContext from "./AddTaskContext.tsx";

const SubtaskBox = ({
    subtask,
    taskID,
}: {
    subtask: Subtask;
    taskID: string;
}) => {
    return (
        <div className="ml-2 p-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Minus size={20} />
                <h1 className="font-medium text-lg">{subtask.text}</h1>
            </div>
            <div className="flex flex-col gap-2 ml-2 p-2">
                {subtask.task_contexts.length > 0 &&
                    subtask.task_contexts.map((taskContext) => {
                        return (
                            <TaskContextBox
                                key={taskContext.id}
                                taskID={taskID}
                                taskContext={taskContext}
                            />
                        );
                    })}
                <AddTaskContext taskID={taskID} subtaskID={subtask.id} />
            </div>
        </div>
    );
};

export default SubtaskBox;
