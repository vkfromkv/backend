import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.NODE_APP_SUPABASE_URL);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing in .env file');
  process.exit(1); // Exit the process if these variables are not defined
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
