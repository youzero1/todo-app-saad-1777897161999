import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function getRedirectUrl(request: NextRequest, params?: Record<string, string | undefined>) {
  const origin = (() => {
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '';
    return host ? `${proto}://${host}` : new URL(request.url).origin;
  })();

  const url = new URL('/auth/oauth-complete', origin);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value) url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url.toString());
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (items) =>
            items.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            ),
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      return getRedirectUrl(request, { error: exchangeError.message });
    }
    return getRedirectUrl(request);
  }

  if (error) {
    return getRedirectUrl(request, {
      error,
      error_description: error_description ?? '',
    });
  }

  return getRedirectUrl(request, { error: 'missing_code' });
}
