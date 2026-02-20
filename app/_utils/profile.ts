'use server'

import { createClient } from "@/lib/supabase/server";
import { getUser } from "./auth";

export interface Profile {
  id: string
  name: string
  avatar_url: string | null // Optional field for avatar URL
  created_at: string
  updated_at: string
}

export async function getProfile(): Promise<{ data: Profile | null; error: Error | null }> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, avatar_url, created_at, updated_at') // Only fetch the user's profile
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data: data as Profile, error: null }
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to fetch profile')
    console.error('Unexpected error fetching profile:', error)
    return { data: null, error }
  }
}

export async function createProfile(
  name: string,
  avatar_url: string
): Promise<{ data: Profile | null; error: Error | null }> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          name: name.trim(),
          avatar_url: avatar_url.trim(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data: data as Profile, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to create profile');
    console.error('Unexpected error creating profile:', error);
    return { data: null, error };
  }
}

export async function updatePicture(
  avatar_url: string,
  avatar: File | null
): Promise<{ data: Profile | null; error: Error | null }> {
  try {
    const supabase = await createClient();
    const { user } = await getUser();
    if (avatar) {
      const filePath = `avatars/${user?.id}/${avatar.name}`;
      const { error: fileError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, avatar);
      
      if (fileError) {
        console.error('Error uploading avatar:', fileError);
        return { data: null, error: new Error(fileError.message) };
      }

      const { data: fileUrlData } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath, { download: true });
      
      const publicUrl = fileUrlData.publicUrl;
      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user?.id)
        .select() // Only fetch the updated profile
        .single(); // Update the user's profile with the new avatar URL
    }

    return { data: null, error: null }; // Return null data since we're only updating the profile picture
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to update profile picture')
    console.error('Unexpected error updating profile picture:', error)
    return { data: null, error }
  }
}