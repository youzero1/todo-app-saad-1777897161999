import { NextRequest, NextResponse } from 'next/server';
import { readTodos, writeTodos } from '@/lib/todoStore';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const todos = readTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    todos[index] = { ...todos[index], ...body };
    writeTodos(todos);

    return NextResponse.json(todos[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const todos = readTodos();
    const filtered = todos.filter((t) => t.id !== id);

    if (filtered.length === todos.length) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    writeTodos(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
