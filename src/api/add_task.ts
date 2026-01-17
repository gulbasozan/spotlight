import { supabase } from "./supabase"

export const addTask = async (text: Task["text"], priority: Task["priority"]) => {
    return await supabase.from("tasks").insert({ text, priority })
}
