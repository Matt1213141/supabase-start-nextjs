'use server'

import { createClient } from "@/lib/supabase/server";

export interface Profile {
  id: string
  name: string
  avatar_url?: string // Optional field for avatar URL
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

    return { data: data as Profile, error: null }
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to create profile')
    console.error('Unexpected error creating profile:', error)
    return { data: null, error }
  }
}

export async function updatePicture(
  avatar_url: string
): Promise<{ data: Profile | null; error: Error | null }> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatar_url.trim() })
      .select()
      .single()

    if (error) {
      console.error('Error updating profile picture:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data: data as Profile, error: null }
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to update profile picture')
    console.error('Unexpected error updating profile picture:', error)
    return { data: null, error }
  }
}