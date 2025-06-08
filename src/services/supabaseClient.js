import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txhxqrwzwgivxvvnwpnk.supabase.co/rest/v1/artikel"; // Ganti dengan URL Anda
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4aHhxcnd6d2dpdnh2dm53cG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyODQ5NDIsImV4cCI6MjA2NDg2MDk0Mn0.QgAyKR-P6khZsSWtG5Su1UOMPqS5piCqZ7WT5mAh4TY"

export const supabase = createClient(supabaseUrl, supabaseKey);
