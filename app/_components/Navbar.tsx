'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = () => {
    router.push('/login');
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-white dark:bg-zinc-900 shadow mb-8">
      <div className="text-xl font-bold text-blue-700 dark:text-white">
        MyApp
      </div>
      <div>
        {user ? (
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
