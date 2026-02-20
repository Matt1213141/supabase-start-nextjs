'use client';

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Navbar from "@/app/_components/Navbar";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Detect if user is logged in and set user state
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start mx-auto">
        <section className="flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome!</h1>
          <p className="mb-8 text-lg text-center text-zinc-700 dark:text-zinc-300">
            To get started, please log in or sign up below.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Log In</button>
            <button className="px-6 py-2 rounded bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">Sign Up</button>
          </div>
        </section>
      </main>
    </div>
  );
}
