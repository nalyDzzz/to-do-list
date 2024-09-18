import { deleteMultipleTodos } from "@/utils/dbQueries";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { idsToDelete } = await req.json();
    await deleteMultipleTodos(idsToDelete);
    return NextResponse.json({ message: 'Todos deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting todos' },
      { status: 500 }
    );
  }
}
