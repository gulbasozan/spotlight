
import { supabase } from "./supabase";

export const deleteTaskContext = async (id: TaskContext["id"]) => {
    return await supabase.from("task_contexts").delete().eq("id", id)
};
