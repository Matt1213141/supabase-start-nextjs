import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
    console.log("process.env.NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const c = (await cookies()).getAll();
          return c;
        },
        async setAll(cookiesToSet) {
          const cookieStore = await cookies();
          await Promise.all(cookiesToSet.map(async ({ name, value, options }) => {
            cookieStore.set(name, value, options);
          }))
        },
      },
    }
  )

  // Refresh session if expired - 30 seconds before expiration
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    // Apply the middleware to all routes except the ones in ignoredRoutes
    '/',
    '/about',
    '/blog',
    '/contact',
  ],
  ignoredRoutes: ['/_next/static', '/_external', '/api/auth/callback'],
}