'use client';
import React from 'react';
import { useTodoStore } from '@/utils/store/useTodoStore';
import { Button, Menu } from '@mantine/core';
import { FaAlignJustify } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function CompleteSelected() {
  const checkedItems = useTodoStore((state) => state.checkedItems);
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idsToDelete: checkedItems }),
    });
    if (!response.ok) {
      throw new Error('Failed to update the todo');
    }
    router.refresh();
  };

  if (checkedItems.length === 0) return null;

  return (
    <>
      <Menu trigger="hover" withArrow>
        <Menu.Target>
          <Button w="fit-content">
            <FaAlignJustify />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Checked Items: {checkedItems.length}</Menu.Label>
          <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
          <Menu.Item>Complete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
