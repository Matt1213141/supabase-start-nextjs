'use client';
import AuthLayout from "@/app/_components/AuthLayout";
import { useError } from "@/app/_components/ErrorContext";
import { useUser } from "@/app/_components/UserContext";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setError } = useError();
  const { user, loading } = useUser();

  useEffect(() => {
	// See if user is already logged in, if so redirect to dashboard
	if (!loading && user) {
	  router.push('/dashboard');
	}
  }, [user, loading, router]);
  
  const handleSubmit = async () => {
	try {
	  const supabase = createClient();
	  // Check if email and password are not empty
	  if (!email || !password) {
	    setError("Please enter both email and password.");
	    return;
	  }
	  // Check if email is in valid format
	  if (!/\S+@\S+\.\S+/.test(email)) {
	    setError("Please enter a valid email address.");
	    return;
	  }

	  // Call Supabase auth signIn method here
	  const { data, error } = await supabase.auth.signInWithPassword({ 
		email: email.trim(), 
		password: password.trim() 
	  });

	  if (error) {
	  	setError("Login failed: " + error.message);
	  } else {
	  	setError("Login successful! Welcome, " + data?.user?.email);
	  	// Redirect to home page or dashboard
	  	router.push('/dashboard');
		router.refresh(); // Refresh to update auth state
	  }
	} catch (error) {
	  setError("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
	}
  };

  return (
  	<div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground transition-colors">
	  <AuthLayout
	    title="Login"
	    fields={[{
	      "label": "Email",
	      "name": "email",
	      "type": "email",
	  	"value": email,
	  	"onChange": (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
	    }, {
	      "label": "Password",
	      "name": "password",
	      "type": "password",
	  	"value": password,
	  	"onChange": (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
	    }]}
	    onSubmit={() => {
	      handleSubmit();
	    }}
	  />
  	</div>
  );
}
