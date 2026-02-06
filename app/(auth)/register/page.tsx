
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	// Check if name, email and password are not empty
	if (!name || !email || !password) {
	  alert("Please enter name, email and password.");
	  return;
	}
	// Call Supabase auth signUp method here
	try {
	  supabase.auth.signUp({
	  email: email,
	  password: password,
	  options: {
	  	data: {
	  	  name: name
	  	}
	  }
	  })
	  .then(({ data, error }) => {
	  	if (error) {
	  	  alert("Registration failed: " + error.message);
	  	} else {
	  	  alert("Registration successful! Please check your email for confirmation.");
	  	}
	  });
	} catch (error) {
		alert("An unexpected error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
	}
  };

  return (
  	<div className="flex min-h-screen items-center justify-center bg-background text-foreground transition-colors">
  	  <form className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-900 dark:text-white" onSubmit={handleSubmit}>
  	  	<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
  	  	<div className="mb-4">
  	  	  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
  	  	  <input
  	  	  	type="text"
  	  	  	id="name"
  	  	  	name="name"
  	  	  	className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  	  	  	value={name}
  	  	  	onChange={(e) => setName(e.target.value)}
			required
  	  	  />
  	  	</div>
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
  	  	  Register
  	  	</button>
  	  </form>
  	</div>
  );
}
