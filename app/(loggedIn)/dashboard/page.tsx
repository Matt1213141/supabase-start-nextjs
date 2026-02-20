'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import LoadingBar from '@/app/_components/LoadingBar';
import { useUser } from '@/app/_components/UserContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!user) {
    return <LoadingBar />;
  }
  
  return (
    <div className="w-full h-full min-h-screen text-2xl flex justify-center items-center">
      <h1>Welcome to your Dashboard, {user.email}!</h1>
      {/* Additional dashboard content can go here */}
    </div>
  );
}