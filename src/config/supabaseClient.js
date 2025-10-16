// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rajpvmfarysrjfyncnhe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhanB2bWZhcnlzcmpmeW5jbmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjM4MDUsImV4cCI6MjA3NjE5OTgwNX0.YHRF-mjpgvmb1k6kSfCaWZihZdQd4Cbw5pS1fULpVWE';

export const supabase = createClient(supabaseUrl, supabaseKey);
