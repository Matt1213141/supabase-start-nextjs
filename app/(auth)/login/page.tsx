
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  
  const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	// Check if email and password are not empty
	if (!email || !password) {
	  alert("Please enter both email and password.");
	  return;
	}
	// Call Supabase auth signIn method here
	try {
	  supabase.auth.signInWithPassword({ email, password })
	  .then(({ data, error }) => {
	  	if (error) {
	  	  alert("Login failed: " + error.message);
	  	} else {
	  	  alert("Login successful! Welcome, " + data?.user?.email);
	  	  // Redirect to home page or dashboard
	  	  window.location.href = "/dashboard";
	  	}
	  });
	} catch (error) {
	  alert("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
	}
  };

  return (
  	<div className="flex min-h-screen items-center justify-center bg-background text-foreground transition-colors">
  	  <form className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-900 dark:text-white" onSubmit={handleSubmit}>
  	  	<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
  	  	<div className="mb-4">
  	  	  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
  	  	  <input
  	  	  	type="email"
  	  	  	id="email"
  	  	  	name="email"
  	  	  	className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  	  	  	value={email}
  	  	  	onChange={(e) => setEmail(e.target.value)}
			required
  	  	  />
  	  	</div>
  	  	<div className="mb-6">
  	  	  <label htmlFor="password" className="block mb-1 font-medium">Password</label>
  	  	  <input
  	  	  	type="password"
  	  	  	id="password"
  	  	  	name="password"
  	  	  	className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  	  	  	value={password}
  	  	  	onChange={(e) => setPassword(e.target.value)}
			required
  	  	  />
  	  	</div>
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
