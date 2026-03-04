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
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    else {
      // Fetch user data
      const fetchUserData = async () => {
        const { data, error } = await supabase.from('users').select('*').eq('id', user?.id).single();
        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setName(data?.name || 'User');
          console.log('User data:', data);
        }
      };
      fetchUserData();
    }
  }, [user, loading, router]);

  if (!user) {
    return <LoadingBar />;
  }
  
  return (
    <div className="w-full h-full min-h-screen text-2xl flex justify-center items-center">
      <h1>Welcome to your Dashboard, {name}!</h1>
      {/* Additional dashboard content can go here */}
    </div>
  );
}