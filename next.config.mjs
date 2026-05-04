/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Prevent static prerendering of pages that use Supabase client-side
  // by ensuring the Supabase client is only initialized when env vars are present
};

export default nextConfig;
