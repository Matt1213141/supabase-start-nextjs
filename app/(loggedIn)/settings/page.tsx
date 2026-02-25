'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/_components/UserContext";
import LoadingBar from "@/app/_components/LoadingBar";
import { updatePicture } from "@/app/_utils/profile";
import { useError } from "@/app/_components/ErrorContext";

export default function SettingsPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const { setError } = useError();
  const { user, loading } = useUser();

  useEffect(() => {
    // Check to see if the user is logged in
    if (!loading && !user) {
      router.push('/login');
    }
    console.log('User in settings page:', user);
  }, [user, loading, router]);

  function handleProfilePictureClick() {
    // Open a file input dialog to allow the user to select a new profile picture
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      setFile(selectedFile || null);
      if (selectedFile) {
        console.log('Selected file:', selectedFile);
        // Upload the file to Supabase Storage and update the user's profile with the new avatar URL
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        try {
          // Call server side function to handle file upload and profile update
          const reponse = await updatePicture('', selectedFile);
          if (reponse.error) {
            setError('Failed to update profile picture. Please try again.' + reponse.error);
            return;
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
          setError('Failed to update profile picture. Please try again.');
          return;
        }
        alert('Profile picture updated successfully!');
      }
    };
    fileInput.click();
  }

  if (!user) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full p-8 h-full min-h-screen text-2xl flex flex-col items-center">
      <h1>Settings Page for {user.email}</h1>
      <div className="w-full flex flex-row mt-4 justify-between items-center">
        {/* Show profile picture if it exists */}
        <div className="mr-4 max-w-3xl">
          Profile Picture:
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button className="text-lg px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:cursor-pointer hover:bg-blue-700 transition dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            onClick={handleProfilePictureClick}
          >
            Edit
          </button>
          <img
            src={user.avatar_url || '/default_icon.png'}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full cursor-pointer"
            onClick={handleProfilePictureClick}
            />
        </div>
      </div>
      <div className="w-full flex flex-row mt-4 justify-between items-center">
        <p className="mr-4 max-w-3xl">
          Name: 
        </p>
        <p className="flex flex-row gap-4 items-center">
          <button className="text-lg px-4 py-2 rounded bg-blue-600 text-white hover:cursor-pointer font-semibold hover:bg-blue-700 transition dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
            Edit
          </button>
          {user.user_metadata.name || 'No name set'}
        </p>
      </div>
      {/* Additional settings content can go here */}
    </div>
  )
}