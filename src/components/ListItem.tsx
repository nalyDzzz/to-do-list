'use client';
import React, { useEffect, useState } from 'react';
import { Box, Paper, Text, Button, Checkbox, TextInput } from '@mantine/core';
import { FaPencil, FaTrash, FaCheck } from 'react-icons/fa6';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import classes from './ListItem.module.css';
import { useTodoStore } from '@/utils/store/useTodoStore';

type Props = {
  content: string;
  id: number;
  isChecked: boolean;
};

export const ListItem = ({ content, id, isChecked }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const toggleChecked = useTodoStore((state) => state.toggleChecked);

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
    if (value === content) {
      setIsEditing(false);
      return;
    }
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

  const handleCheck = () => {
    setChecked(!checked);
    toggleChecked(id);
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
        className="p-2 md:px-5 flex justify-between gap-2"
        shadow="xl"
        radius="md"
      >
        <div className="flex flex-row items-center gap-2 justify-center">
          <Checkbox
            size={isDesktop ? 'sm' : 'xs'}
            onChange={handleCheck}
            checked={checked}
          />
          {!isEditing && (
            <Text size={isDesktop ? 'md' : 'sm'} onClick={handleCheck}>
              {content}
            </Text>
          )}
          {isEditing && (
            <>
              <TextInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                leftSection={isDesktop && <FaCheck />}
                size={isDesktop ? 'sm' : 'xs'}
                onClick={handleSave}
              >
                {isDesktop && 'Save'}
                {!isDesktop && <FaCheck />}
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button
            color="gray.7"
            leftSection={isDesktop ? <FaPencil /> : false}
            onClick={handleEdit}
            size={isDesktop ? 'sm' : 'xs'}
          >
            {isDesktop ? 'Edit' : <FaPencil />}
          </Button>
          <Button
            color="secondary"
            leftSection={isDesktop ? <FaTrash /> : false}
            onClick={handleDelete}
            size={isDesktop ? 'sm' : 'xs'}
          >
            {isDesktop ? 'Delete' : <FaTrash />}
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
