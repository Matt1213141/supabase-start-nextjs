'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/_components/UserContext";
import LoadingBar from "@/app/_components/LoadingBar";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    // Check to see if the user is logged in
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  function handleProfilePictureClick() {
    // Open a file input dialog to allow the user to select a new profile picture
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Selected file:', file);
        // Here you would typically upload the file to your server or a storage service
        // and then update the user's profile with the new avatar URL.
        // For this example, we'll just log the file and show an alert.
        alert('Profile picture updated successfully!');
      }
    };
    fileInput.click();
  }

  if (!user) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full h-full min-h-screen text-2xl flex justify-center items-center">
      <h1>Settings Page for {user.email}</h1>
      <div className="flex flex-row mt-4">
        {/* Show profile picture if it exists */}
        <img
          src={user.avatar_url || '/default_icon.png'}
          alt="Profile Picture"
          className="w-16 h-16 rounded-full cursor-pointer"
          onClick={handleProfilePictureClick}
        />
        {/* Additional settings content can go here */}
      </div>  
    </div>
  )
}