import { supabase } from "./supabase";

export const deleteTask = async (id: Task["id"]) => {
    return await supabase.from("tasks").delete().eq("id", id)
};
