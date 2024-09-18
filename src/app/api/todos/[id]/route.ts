import { NextRequest, NextResponse } from 'next/server';
import { deleteTodo, updateTodo } from '@/utils/dbQueries';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteTodo(Number(id))
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting todo' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; 
    const { content } = await req.json();
    const updatedTodo = await updateTodo(Number(id), content);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating todo' },
      { status: 500 }
    );
  }
}