import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iwkncnjryvjzdtpneotr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3a25jbmpyeXZqemR0cG5lb3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMjM5MDUsImV4cCI6MjAxNDU5OTkwNX0.s0tt7DdpWB5bOiyBFZ_LNoNUbX_RyYJXKODP7zIa2xo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
