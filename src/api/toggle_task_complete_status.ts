import { supabase } from "./supabase";

export const toggleTaskCompleteStatus = async (
    taskID: Task["id"],
    isCompleted: boolean,
) => {
    return await supabase
        .from("tasks")
        .update({ completed_at: !isCompleted ? new Date() : null })
        .eq("id", taskID);
};
