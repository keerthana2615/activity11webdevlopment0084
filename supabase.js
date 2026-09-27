import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://scwheoxzxmdlfpbgthit.supabase.co";
const supabaseKey = "sb_publishable_hey48G8j93HGuYE4ESlrtQ_UFmBNqzh";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);