'use server';
import prisma from '@/app/api/db';
import { getServerSession } from 'next-auth';
import { checkedItem } from './store/useTodoStore';

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
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await prisma.todos.findMany({
    orderBy: { id: 'asc' },
    where: {
      author: {
        email: session.user?.email as string,
      },
    },
  });
}

export async function createTodo(formData: { content: string }) {
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
  return await prisma.todos.delete({ where: { id: id } });
}

export async function deleteMultipleTodos(items: checkedItem[]) {
  const session = await fetchSession();
  if (!session) return null;
  const ids = items.map((item) => item.id);
  return await prisma.todos.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function updateTodo(id: number, content: string) {
  const session = await fetchSession();
  if (!session) return null;
  return await prisma.todos.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
}

export async function completeTodo(id: number) {
  const session = await fetchSession();
  if (!session) return null;
  return await prisma.todos.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
}

export async function completeMultiple(items: checkedItem[]) {
  const session = await fetchSession();
  if (!session) return null;
  const previouslyCompletedTrue = items.filter(
    (item) => item.previousCompleted
  );
  const previouslyCompletedFalse = items.filter(
    (item) => !item.previousCompleted
  );

  const idsWithTrue = previouslyCompletedTrue.map((item) => item.id);
  const idsWithFalse = previouslyCompletedFalse.map((item) => item.id);
  await prisma.todos.updateMany({
    where: {
      id: {
        in: idsWithFalse,
      },
    },
    data: {
      completed: true,
    },
  });
  return await prisma.todos.updateMany({
    where: {
      id: {
        in: idsWithTrue,
      },
    },
    data: {
      completed: false,
    },
  });
}
