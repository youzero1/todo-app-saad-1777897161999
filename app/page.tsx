import dynamic from 'next/dynamic';

const TodoApp = dynamic(() => import('@/components/TodoApp'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <TodoApp />
    </main>
  );
}
