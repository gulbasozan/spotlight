import { supabase } from "./supabase";

export const toggleSubtaskCompleteStatus = async (
    subtaskID: Subtask["id"],
    isCompleted: boolean,
) => {
    return await supabase
        .from("subtasks")
        .update({ completed_at: !isCompleted ? new Date() : null })
        .eq("id", subtaskID);
};
