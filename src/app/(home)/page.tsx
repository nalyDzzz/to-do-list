import { Button, Container, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import { ListItem } from '@/components/ListItem';
import { createTodo, getAllTodos } from '@/utils/dbQueries';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import CompleteSelected from '@/components/CompleteSelected';

export default async function Page() {
  const todos = await getAllTodos();
  const session = await getServerSession();

  const create = async (formData: FormData) => {
    'use server';
    const data = {
      content: formData.get('content') as string,
    };
    await createTodo(data);
    revalidatePath('/');
  };

  return (
    <Container className="flex flex-col gap-2">
      <Title>
        {ResponsiveTitle()}, {session?.user?.name}!
      </Title>
      <Text c="dimmed">What&#39;s on the to do list for the day?</Text>
      <div className="grid md:grid-cols-[min-content_1fr] gap-2 md:gap-0">
        <CompleteSelected />
        <form className='col-start-2 flex flex-row gap-2 md:justify-center' action={create}>
          <TextInput name="content" w={'50%'} placeholder="Add item" />
          <Button type="submit">Add to List</Button>
        </form>
      </div>
      {todos.map((el) => (
        <ListItem key={el.id} content={el.content || ''} id={el.id} />
      ))}
    </Container>
  );
}

function ResponsiveTitle() {
  const date = new Date();
  const hours = date.getHours();

  if (hours > 0 && hours < 12) {
    return 'Good Morning';
  } else if (hours > 12 && hours < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}
