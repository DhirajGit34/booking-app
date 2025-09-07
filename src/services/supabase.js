import { createClient } from "@supabase/supabase-js";
// exporting to use in other files for image upload and other operations
export const supabaseUrl = "https://zsjraostmrgemospygga.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzanJhb3N0bXJnZW1vc3B5Z2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTUwOTgsImV4cCI6MjA2MTg3MTA5OH0.6855rY_f7qmbdTOjDnNOA9zojtHjFqCC8z9Sg67whIY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
