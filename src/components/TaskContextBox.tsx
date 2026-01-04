import { CornerDownRight } from "lucide-react";

const TaskContextBox = () => {
    return (
        <div className="ml-2 px-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <CornerDownRight size={20} />
                <h1 className="font-light text-md">TaskContext</h1>
            </div>
        </div>
    );
};

export default TaskContextBox;
