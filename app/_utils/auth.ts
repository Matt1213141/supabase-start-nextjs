'use server';

import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return { user: null, error: new Error(error.message) };
    }

    return { user: data?.user ?? null, error: null };
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Failed to fetch user");
    console.error("Unexpected error fetching user:", err);
    return { user: null, error: err };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return { error: new Error(error.message) };
    }

    return { error: null };
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Failed to sign out");
    console.error("Unexpected error signing out:", err);
    return { error: err };
  }
}