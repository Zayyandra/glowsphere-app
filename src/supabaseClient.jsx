import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgdqxosoknqttcsdhapl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZHF4b3Nva25xdHRjc2RoYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNTQ0MzYsImV4cCI6MjA2NDkzMDQzNn0.ZMnqXp9uDdv4J3ctmk2XrLt3O9kU7cHLL0x5SXqO8lc'

export const supabase = createClient(supabaseUrl, supabaseKey)
