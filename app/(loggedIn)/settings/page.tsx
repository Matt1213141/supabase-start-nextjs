'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/_components/Contexts/UserContext";
import LoadingBar from "@/app/_components/LoadingBar";
import { updateUserName, fetchAvatarUrl, updatePicture } from "@/app/_utils/profile";
import { useError } from "@/app/_components/Contexts/ErrorContext";
import { useSuccess } from "@/app/_components/Contexts/SuccessContext";
import ChangeNameModal from "@/app/_components/modals/ChangeNameModal";
import { buttonStyles } from "@/app/_globals/ButtonStyles";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const { user, loading } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [changeNameModal, setChangeNameModal] = useState<boolean>(false);

  useEffect(() => {
    // Check to see if the user is logged in
    if (!loading && !user) {
      router.push('/login');
    }
    // Fetch the user's avatar URL if the user is logged in
    async function fetchAvatar() {
      if (user && !loading) {
        const avatarUrl = await fetchAvatarUrl(user);
        setAvatarUrl(avatarUrl);
      }
    }
    fetchAvatar();

    // Fetch the user's name from the database
    async function fetchUserName() {
      if (user && !loading) {
        const name = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single()
          .then((res) => res.data?.name || '');
        console.log('Fetched user name:', name);
        setNewName(name);
      }
    }
    fetchUserName();
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
        // Upload the file to Supabase Storage and update the user's profile with the new avatar URL
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        try {
          // Call server side function to handle file upload and profile update
          const response = await updatePicture('', selectedFile);
          if (response.error) {
            setError('Failed to update profile picture. Please try again.' + response.error);
            return;
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
          setError('Failed to update profile picture. Please try again.');
          return;
        }
        setSuccess('Profile picture updated successfully!');
      }
    };
    fileInput.click();

    // Update the avatar URL state to reflect the new profile picture
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarUrl(newAvatarUrl);
    }
  }

  // Bring up the ChangeNameModal when the user clicks the "Edit" button next to their name
  function handleEditNameClick() {
    setChangeNameModal(true);
  }

  async function updateName(newName: string) {
    // Call server side function to handle name update
    const response = await updateUserName(newName, {});
    if (response.error) {
      setError('Failed to update name. Please try again.' + response.error);
      return;
    }
    setSuccess('Name updated successfully!');
  }

  if (!user || loading) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full p-8 h-full min-h-screen text-xl flex flex-col items-center">
      <h1>Settings Page for {user.email}</h1>
      <div className="w-full flex flex-row mt-4 justify-between items-center">
        {/* Show profile picture if it exists */}
        <div className="mr-4 max-w-3xl">
          Profile Picture:
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button className={buttonStyles.primary}
            onClick={handleProfilePictureClick}
          >
            Edit
          </button>
          <img
            src={avatarUrl || '/default_icon.png'}
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
          <button className={buttonStyles.primary}
            onClick={() => {
              handleEditNameClick();
            }}
          >
            Edit
          </button>
          {newName || user.user_metadata.name || 'No name set'}
        </p>
      </div>
      {/* Additional settings content can go here */}
      {changeNameModal && (
        <ChangeNameModal 
          isOpen={changeNameModal}
          onClose={() => setChangeNameModal(false)}
          newName={newName || user.user_metadata.name || ''}
          onChange={(e) => setNewName(e.target.value)}
          onSave={(newName) => {
            updateName(newName);
            setChangeNameModal(false);
          }}
        />
      )}
    </div>
  )
}