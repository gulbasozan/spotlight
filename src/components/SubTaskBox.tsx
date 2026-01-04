import { Minus } from "lucide-react"

import TaskContextBox from "./TaskContextBox.tsx";

const SubtaskBox = () => {
    return (
        <div className="ml-2 p-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Minus size={20}/>
                <h1 className="font-medium text-lg">Subtask</h1>
            </div>
            <div className="flex flex-col gap-2">
                <TaskContextBox />
                <TaskContextBox />
            </div>
        </div>
    )
}

export default SubtaskBox;
