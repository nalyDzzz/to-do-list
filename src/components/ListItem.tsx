'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Text,
  Group,
  Button,
  Checkbox,
  TextInput,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import classes from './ListItem.module.css';

type Props = {
  content: string;
  id: number;
};

export const ListItem = ({ content, id }: Props) => {
  const computedColorScheme = useComputedColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();

  const handleDelete = async () => {
    const result = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!result.ok) {
      throw new Error('Failed to delete the todo.');
    }
    router.refresh();
  };

  const handleEdit = async () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const result = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: value }),
    });
    if (!result.ok) {
      throw new Error('Failed to update the todo');
    }
    router.refresh();
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      setValue(content);
    }
  }, [isEditing, content]);

  return (
    <Box className="flex flex-col gap-2">
      <Paper
        classNames={{ root: classes.paper }}
        className="p-2 md:px-5 flex justify-between"
        shadow="xl"
        radius="md"
      >
        <Group>
          <Checkbox className="" />
          {!isEditing && <Text>{content}</Text>}
          {isEditing && (
            <>
              <TextInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={handleSave}>Save</Button>
            </>
          )}
        </Group>
        <Group>
          <Button
            color="gray.7"
            leftSection={isDesktop ? <FaPencil /> : false}
            onClick={handleEdit}
          >
            {isDesktop ? 'Edit' : <FaPencil />}
          </Button>
          <Button
            color="secondary"
            leftSection={isDesktop ? <FaTrash /> : false}
            onClick={handleDelete}
          >
            {isDesktop ? 'Delete' : <FaTrash />}
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};
