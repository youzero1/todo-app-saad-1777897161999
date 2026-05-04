'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function AuthButton() {
  const [signingIn, setSigningIn] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async () => {
    try {
      setSigningIn(true);
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={signingIn}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {signingIn ? 'Signing in...' : 'Sign in'}
    </button>
  );
}
