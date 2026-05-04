import dynamic from 'next/dynamic';

const AuthButton = dynamic(() => import('./AuthButton'), { ssr: false });

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span className="font-bold text-slate-800 text-lg">My Todos</span>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
