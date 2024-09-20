'use client';
import React from 'react';
import { useTodoStore } from '@/utils/store/useTodoStore';
import { ActionIcon, Menu } from '@mantine/core';
import { FaAlignJustify } from 'react-icons/fa6';
import { FaTrash, FaCheck } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { completeMultiple, deleteMultipleTodos } from '@/utils/dbQueries';

export default function CompleteSelected() {
  const checkedItems = useTodoStore((state) => state.checkedItems);
  const resetChecked = useTodoStore((state) => state.resetChecked);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMultipleTodos(checkedItems);
    resetChecked();
    router.refresh();
  };

  const handleComplete = async () => {
    completeMultiple(checkedItems);
    resetChecked();
    router.refresh();
  };

  if (checkedItems.length === 0) return null;

  return (
    <>
      <Menu trigger="hover" withArrow>
        <Menu.Target>
          <ActionIcon>
            <FaAlignJustify />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Checked Items: {checkedItems.length}</Menu.Label>
          <Menu.Item onClick={handleDelete} leftSection={<FaTrash />}>Delete</Menu.Item>
          <Menu.Item onClick={handleComplete} leftSection={<FaCheck />}>Complete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
