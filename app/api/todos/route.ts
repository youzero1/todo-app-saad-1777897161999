import { NextRequest, NextResponse } from 'next/server';
import { readTodos, writeTodos } from '@/lib/todoStore';

export async function GET() {
  try {
    const todos = readTodos();
    return NextResponse.json(todos);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, category } = body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const todos = readTodos();
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      category: category || 'general',
      createdAt: new Date().toISOString(),
      priority: body.priority || 'medium',
    };

    todos.push(newTodo);
    writeTodos(todos);

    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}
