'use client';
import React, { useEffect, useState } from 'react';
import { Box, Paper, Text, Button, Checkbox, TextInput } from '@mantine/core';
import { FaPencil, FaTrash, FaCheck } from 'react-icons/fa6';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import classes from './ListItem.module.css';
import { useTodoStore } from '@/utils/store/useTodoStore';
import { completeTodo, deleteTodo, updateTodo } from '@/utils/dbQueries';

type Props = {
  content: string;
  id: number;
  completed: boolean;
};

export const ListItem = ({ content, id, completed }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const toggleChecked = useTodoStore((state) => state.toggleChecked);

  const handleDelete = async () => {
    await deleteTodo(id);
    router.refresh();
  };

  const handleComplete = async () => {
    await completeTodo(id)
    router.refresh();
  }

  const handleEdit = async () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (value === content) {
      setIsEditing(false);
      return;
    }
    await updateTodo(id, value);
    router.refresh();
    setIsEditing(false);
  };

  const handleCheck = () => {
    setChecked(!checked);
    toggleChecked(id, completed);
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
            <Text
              size={isDesktop ? 'md' : 'sm'}
              td={completed ? 'line-through' : ''}
              onClick={handleCheck}
            >
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
          {!completed && (
            <Button
              color="secondary"
              leftSection={isDesktop ? <FaCheck /> : false}
              onClick={handleComplete}
              size={isDesktop ? 'sm' : 'xs'}
            >
              {isDesktop ? 'Complete' : <FaCheck />}
            </Button>
          )}
          {completed && (
            <Button
              color="secondary"
              leftSection={isDesktop ? <FaTrash /> : false}
              onClick={handleDelete}
              size={isDesktop ? 'sm' : 'xs'}
            >
              {isDesktop ? 'Delete' : <FaTrash />}
            </Button>
          )}
        </div>
      </Paper>
    </Box>
  );
};
