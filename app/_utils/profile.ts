'use server'

import { createClient } from "@/lib/supabase/server";
import { getUser } from "./auth";
import { convertServerPatchToFullTree } from "next/dist/client/components/segment-cache/navigation";

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
      const folderPath = `avatars/${user?.id}`;
      // List all files in the user's avatar folder
      const { data: existingFiles, error: listError } = await supabase
        .storage
        .from('avatars')
        .list(folderPath);
      
      if (listError) {
        console.error('Error listing existing avatar files:', listError);
        return { data: null, error: new Error(listError.message) };
      } else if (existingFiles && existingFiles.length > 0) {
        // Delete all existing files in the user's avatar folder
        const filePaths = existingFiles.map(file => `${folderPath}/${file.name}`);
        const { error: deleteError } = await supabase
          .storage
          .from('avatars')
          .remove(filePaths);
        
        if (deleteError) {
          console.error('Error deleting existing avatar files:', deleteError);
        }
      }

      const filePath = `avatars/${user?.id}/${avatar.name}`;
      const { error: fileError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, avatar);
      
      if (fileError) {
        console.error('Error uploading avatar:', fileError);
        return { data: null, error: new Error(fileError.message) };
      }

      const { data: fileUrlData, error: fileUrlError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user?.id)
        .select() // Only fetch the updated profile
        .single();

      if (fileUrlError) {
        console.error('Error creating signed URL:', fileUrlError);
        return { data: null, error: new Error(fileUrlError.message) };
      }

      const signedUrl = fileUrlData.signedUrl;
      await supabase
        .from('profiles')
        .update({ avatar_url: signedUrl })
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

export async function fetchAvatarUrl(user: any): Promise<string | null> {
  try {
    const supabase = await createClient();
    // Get profile url from the profiles table
    const { data: profileData, error: fetchProfileError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user?.id)
      .single();

    if (fetchProfileError) {
      console.error('Error fetching profile data:', fetchProfileError);
      return null;
    }

    if (!profileData || !profileData.avatar_url) {
      console.log('No avatar URL found for user:', user?.id);
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .storage
      .from('avatars')
      .createSignedUrl(profileData.avatar_url, 60 * 60); // URL valid for 1 hour
    
    if (profileError) {
      console.error('Error creating signed URL:', profileError);
      return null;
    }
    
    return profile?.signedUrl || null;
  } catch (error) {
    console.error('Unexpected error fetching avatar URL:', error);
    return null;
  }
}