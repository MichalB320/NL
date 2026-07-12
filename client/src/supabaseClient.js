// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrvtvkgdejjncjonootk.supabase.co';
const supabaseAnonKey = 'sb_publishable_QcGQG7gVV-h1Mt205wTboA_dTwQKRIY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);