import { supabase } from "./supabase"

export const addSubtask = async (text: Subtask["text"], task_id: Subtask["task_id"]) => {
    return await supabase.from("subtasks").insert({ text, task_id })
}

