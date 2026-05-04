'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthComplete() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error') || '';
    const errorDescription = params.get('error_description') || '';

    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage(
          {
            type: 'summon-supabase-auth-popup-done',
            ok: !error,
            error: error || undefined,
            error_description: errorDescription || undefined,
          },
          window.location.origin
        );
      } catch (e) {}

      try {
        window.opener.focus();
      } catch (e) {}

      window.close();

      const t = window.setTimeout(() => {
        router.replace('/');
      }, 400);

      return () => window.clearTimeout(t);
    }

    router.replace('/');
  }, [router]);

  return (
    <p className="p-8 text-center text-sm text-muted-foreground">
      Finishing sign-in
is
...
    </p>
  );
}
