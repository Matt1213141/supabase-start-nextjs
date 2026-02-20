import { useRouter } from "next/navigation"
import { useState } from "react"
import { updatePicture } from "@/app/_utils/profile"

export const setupPicture = () => {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: updateError } = await updatePicture(avatarUrl, avatar);
    if (updateError) {
      setError(updateError.message);
      setIsSubmitting(false);
      return;
    }

    // Redirect to home page after successful creation
    router.push('/dashboard');
  }

  return { avatarUrl, isSubmitting, error, avatar, setAvatarUrl, setIsSubmitting, setError, handleSubmit, setAvatar }
}