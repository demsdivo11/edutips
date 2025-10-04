import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AdminUser {
  id: string;
  username: string;
  created_at: string;
}

export interface EdutipsContent {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}
