import { Button, Container, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import { ListItem } from '@/components/ListItem';
import { createTodo, getAllTodos } from '@/utils/dbQueries';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  const todos = await getAllTodos();
  const session = await getServerSession()
  
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
      <Title>Good Morning {session?.user?.name}!</Title>
      <Text c="dimmed">What&#39;s on the to do list for the day?</Text>
      <form className="flex flex-row gap-2" action={create}>
        <TextInput name="content" w={'50%'} placeholder="Add item" />
        <Button type="submit">Add to List</Button>
      </form>
      {todos.map((el) => (
        <ListItem key={el.id} content={el.content || ''} id={el.id}/>
      ))}
    </Container>
  );
}
