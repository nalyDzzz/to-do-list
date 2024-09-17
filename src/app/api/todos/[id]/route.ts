import { NextResponse } from 'next/server';
import { deleteTodo } from '@/utils/dbQueries';

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
