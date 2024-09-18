import prisma from '@/app/api/db';
import { getServerSession } from 'next-auth';

export async function fetchSession() {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error('User is not authenticated');
  }
  return session;
}

export async function addUserToDb(email: string, name: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return true;
    } else {
      await prisma.user.create({
        data: {
          name: name,
          email: email,
        },
      });
      return true;
    }
  } catch (error) {
    if (error) console.error(error);
    return false;
  }
  
}

export async function getAllTodos() {
  const session = await fetchSession();
  return await prisma.todos.findMany({
    orderBy: {id: 'asc'},
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

};

export async function updateTodo(id:number, content: string) {
  const session = await fetchSession();
  if (!session) return null;
  return await prisma.todos.update({
    where: {
      id: id,
    },
    data: {
      content: content
    }
  })
}