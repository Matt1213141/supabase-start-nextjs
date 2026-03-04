'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import LoadingBar from '@/app/_components/LoadingBar';
import { useUser } from '@/app/_components/Contexts/UserContext';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, loading } = useUser();
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    console.log('User object:', user);
    // Fetch the user's name from the database
    async function fetchUserName() {
      if (user && !loading) {
        const name = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single()
          .then((res) => res.data?.name || '');
        console.log('Fetched user name:', name);
        setUserName(name);
      }
    }
    fetchUserName();
    console.log('User name state:', userName);
  }, [user, loading, router]);

  if (!user) {
    return <LoadingBar />;
  }
  console.log('Rendering DashboardPage with user:', user);
  return (
    <div className="w-full h-full min-h-screen text-2xl flex justify-center items-center">
      <h1>Welcome to your Dashboard, {userName || user.user_metadata?.name}!</h1>
      {/* Additional dashboard content can go here */}
    </div>
  );
}