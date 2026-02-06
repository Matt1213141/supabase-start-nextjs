import { useRouter } from "next/navigation"
import { useState } from "react"
import { updatePicture } from "@/app/_utils/profile"

export const setupProfile = () => {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const { error: updateError } = await updatePicture(avatarUrl)
    if (updateError) {
      setError(updateError.message)
      setIsSubmitting(false)
      return
    }

    // Redirect to home page after successful creation
    router.push('/')
  }

  return { avatarUrl, isSubmitting, error, setAvatarUrl, setIsSubmitting, setError, handleSubmit }
}