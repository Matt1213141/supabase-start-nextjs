'use client';
import AuthLayout from "@/app/_components/AuthLayout";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/login');
  };

  // Check every 5 seconds if the user has verified their email
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/auth/check-email-verified');
        const data = await response.json();
        if (data.verified) {
          clearInterval(interval);
          router.push('/dashboard'); // Redirect to dashboard after verification
        }
      } catch (error) {
        console.error("Error checking email verification status:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background text-foreground transition-colors">
      <div className="text-center space-y-4">
        <p className="text-foreground/80">
          Please verify your email address before continuing. Check your inbox for a verification link.
        </p>
        <p className="text-sm text-foreground/60">
          Didn't receive an email? Check your spam folder or try registering again.
        </p>
      </div>
      <button
        onClick={handleReturn}
        className="mt-6 px-4 py-2 bg-primary text-white rounded bg-blue-600 hover:bg-blue-700 hover:cursor-pointer hover:bg-primary/90 transition-colors"
      >
        Return to Login
      </button>
    </div>
  );
}
