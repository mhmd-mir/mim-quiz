import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://fjsoadjcjpbgwdcftvad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqc29hZGpjanBiZ3dkY2Z0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNTgwNjEsImV4cCI6MTk5MjczNDA2MX0.mv6agfuuh8pzbXlO0nib-70nZBh25r4tu-vCD501jPE')

export default supabase