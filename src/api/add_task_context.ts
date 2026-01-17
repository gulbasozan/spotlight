import { supabase } from "./supabase"

export const addTaskContext = async (text: TaskContext["text"], subtask_id: TaskContext["subtask_id"]) => {
    return await supabase.from("task_contexts").insert({ text, subtask_id })
}
