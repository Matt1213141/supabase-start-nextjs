'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

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
      <div className="flex flex-row gap-2 text-xl font-bold text-blue-700 dark:text-white">
        {/* User icon */}
        {user && (
          <Link href="/settings" className="flex items-center gap-1">
            <img 
              src={user.avatar_url || '/default_icon.png'}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        )}
        <div>
          MyApp
        </div>
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
