'use client';
import AuthLayout from "@/app/_components/AuthLayout";
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  
  const handleSubmit = async () => {
	// Check if email and password are not empty
	if (!email || !password) {
	  alert("Please enter both email and password.");
	  return;
	}
	// Call Supabase auth signIn method here
	try {
	  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	  if (error) {
	  	alert("Login failed: " + error.message);
	  } else {
	  	alert("Login successful! Welcome, " + data?.user?.email);
	  	// Redirect to home page or dashboard
	  	window.location.href = "/dashboard";
	  }
	} catch (error) {
	  alert("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
	}
  };

  return (
  	<div className="flex min-h-screen items-center justify-center bg-background text-foreground transition-colors">
  	  <form className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-900 dark:text-white" onSubmit={handleSubmit}>
  	  	<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
  	  	  <AuthLayout
		  	title="Login"
			fields={[{
				"label": "Email",
				"name": "email",
				"type": "email"
			}, {
				"label": "Password",
				"name": "password",
				"type": "password"
			}]}
			onSubmit={() => {
				handleSubmit();
			}}
  	  	/>
  	  	<button
  	  	  type="submit"
  	  	  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
  	  	>
  	  	  Login
  	  	</button>
  	  </form>
  	</div>
  );
}
