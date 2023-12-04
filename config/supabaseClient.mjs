import { createClient } from "@supabase/supabase-js";

// console.log(process.env.NODE_APP_SUPABASE_URL);
const supabaseUrl = "https://uvowpbczwgkchgpxegqp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b3dwYmN6d2drY2hncHhlZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMzMwNjcsImV4cCI6MjAxNjcwOTA2N30.P5tFs7zJi5oesH4C-d53_2cBtD_JxfUlrb0RIhBML1w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
