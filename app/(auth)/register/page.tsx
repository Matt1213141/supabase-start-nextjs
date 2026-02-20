'use client';
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/app/_components/AuthLayout";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { createProfile } from "@/app/_utils/profile";
import { useUser } from "@/app/_components/UserContext";
import { useError } from "@/app/_components/ErrorContext";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setError } = useError();
  const { user, loading } = useUser();

  useEffect(() => {
	// See if user is already logged in, if so redirect to dashboard
	if (!loading && user) {
	  router.push('/dashboard');
	}
  }, [user, loading, router]);
  
  const handleSubmit = async () => {
    setError(null);
    try {
      const supabase = createClient();  
      if (!name || !email || !password) {
        setError("Please enter name, email and password.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      // Call Supabase auth signUp method here
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            name: name.trim(),
          },
        },
      });  
      if (error) {
        setError("Registration failed: " + error.message);
      } else {
      	// Redirect to email verification page
      	router.push('/verify-email');
      	router.refresh(); // Refresh to update auth state
      }
    } catch (error) {
      setError("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
	<div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground transition-colors">
	  <AuthLayout
	    title="Register"
	    fields={[{
	      "label": "Name",
	      "name": "name",
	      "type": "text",
	      "value": name,
	      "onChange": (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
	    },
	    {
	  	  "label": "Email",
	  	  "name": "email",
	  	  "type": "email",
	  	  "value": email,
	  	  "onChange": (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
	    },
	    {
	  	  "label": "Password",
	  	  "name": "password",
	  	  "type": "password",
	  	  "value": password,
	  	  "onChange": (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
	    },
	    {
	  	  "label": "Confirm Password",
	  	  "name": "confirm_password",
	  	  "type": "password",
	  	  "value": confirmPassword,
	  	  "onChange": (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
	    },
	    ]}
	    onSubmit={() => {
	      handleSubmit();
	    }}
	  />
  	</div>
  );
}
