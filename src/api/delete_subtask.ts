import { supabase } from "./supabase";

export const deleteSubtask = async (id: Subtask["id"]) => {
    return await supabase.from("subtasks").delete().eq("id", id)
};
