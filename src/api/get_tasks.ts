import { supabase } from "./supabase";

export const getTasks = async () => {
    return await supabase
        .from("tasks")
        .select(
            `id,
        created_at,
        text,
        priority,
        subtasks (
            id,
            created_at,
            text,
            task_id,
            task_contexts (
                id,
                created_at,
                text,
                subtask_id
            )
        )
    `,
        )
        .order("priority", { ascending: false });
};
