'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAvatarUrl } from '../_utils/profile';
import { getUser } from '../_utils/auth';
import { useUser } from './UserContext';

export default function Navbar() {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user, loading } = useUser();

  const supabase = createClient();

  useEffect(() => {
    async function fetchAndUpdateUser() {
      if (user) {
        const avatarUrl = await fetchAvatarUrl(user);
        setAvatarUrl(avatarUrl);
      }
    }
    fetchAndUpdateUser();
  }, [user]);

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
              src={avatarUrl || '/default_icon.png'}
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
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          onClick={user ? handleSignOut : handleSignIn}
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
      </div> 
    </nav>
  );
}
