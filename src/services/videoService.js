import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://vltojvklnxrblqndhkoy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdG9qdmtsbnhyYmxxbmRoa295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNzQ3NjksImV4cCI6MTk4Mzg1MDc2OX0.IZ-YGq7LIFJ1xPNjInSnfBjlP1TwiNoCOyp-eA2Jj8E";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                // Select no banco
                .select("*")    // Seleciona tudo
        }
    };
}
