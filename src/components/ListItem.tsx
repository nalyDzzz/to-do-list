'use client';
import React from 'react';
import {Box, Paper, Text, Group, Button, Checkbox} from '@mantine/core';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

type Props = {
  content: string | null;
  id: number;
}

export const ListItem = ({content, id}: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const router = useRouter();

    const handleDelete = async () => {
      console.log('click')
      const result = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })
      if (!result.ok) {
        throw new Error('Failed to delete the todo.');
      }
      router.refresh()
    };

  return (
    <Box className="flex flex-col gap-2">
      <Paper
        className="p-2 md:px-5 flex justify-between"
        bg="dark.8"
        radius="md"
      >
        <Group>
          <Checkbox className="" />
          <Text>{content}</Text>
        </Group>
        <Group>
          <Button color="gray.7" leftSection={isDesktop ? <FaPencil /> : false}>
            {isDesktop ? 'Edit' : <FaPencil />}
          </Button>
          <Button color="secondary" leftSection={isDesktop ? <FaTrash /> : false} onClick={handleDelete}>
            {isDesktop ? 'Delete' : <FaTrash />}
          </Button>
        </Group>
      </Paper>
    </Box>
  );
}