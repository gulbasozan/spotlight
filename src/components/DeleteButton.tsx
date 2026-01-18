import { Trash } from "lucide-react";
import type { MouseEventHandler } from "react";

const DeleteButton = ({ handleClick }: { handleClick: MouseEventHandler<HTMLDivElement> }) => {
    return (
        <div className="p-1.5 rounded-md bg-red-300" onClick={handleClick}>
            <Trash size={16} color={"white"} />
        </div>
    )

}

export default DeleteButton;
