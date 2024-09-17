import prisma from '@/app/api/db';
import { getServerSession } from 'next-auth';

export async function fetchSession() {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error('User is not authenticated');
  }
  return session;
}

export async function getAllTodos() {
  const session = await fetchSession();
  return await prisma.todos.findMany({
    where: {
      author: {
        email: session.user?.email as string,
      },
    },
  });
}

export async function createTodo(formData: { content: string | undefined }) {
  const session = await fetchSession();
  return await prisma.todos.create({
    data: {
      content: formData.content,
      author: { connect: { email: session.user?.email as string } },
    },
  });
}

export async function deleteTodo(id: number) {
    const session = await fetchSession();
    if (!session) return null;
    return await prisma.todos.delete({where: {id: id}})

}