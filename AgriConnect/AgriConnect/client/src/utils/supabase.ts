import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://otmdfoghamvmmwjwzpxw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90bWRmb2doYW12bW13and6cHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjQ2OTcsImV4cCI6MjA3NjA0MDY5N30.PQ7QAfsJJUJ1CPF6JgwNnZz4TvE2pYKmnz1150XFfwY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to upsert user profile after registration
export const upsertUserProfile = async (userId: string, email: string, name: string, state: string, district: string) => {
  const { error } = await supabase
    .from('profiles')
    .upsert([{ id: userId, email, name, state, district }], { onConflict: 'id' });

  if (error) {
    console.error('Error upserting user profile:', error);
    throw error;
  }
};

// Helper function to update user profile
export const updateUserProfile = async (userId: string, updates: { [key: string]: any }) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }

  return data;
};