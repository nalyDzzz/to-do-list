'use client';
import React, { useState } from 'react';
import { useTodoStore } from '@/utils/store/useTodoStore';
import { ActionIcon, Loader, LoadingOverlay, Menu } from '@mantine/core';
import { FaAlignJustify } from 'react-icons/fa6';
import { FaTrash, FaCheck } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { completeMultiple, deleteMultipleTodos } from '@/utils/dbQueries';

export default function CompleteSelected() {
  const checkedItems = useTodoStore((state) => state.checkedItems);
  const resetChecked = useTodoStore((state) => state.resetChecked);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteMultipleTodos(checkedItems);
    resetChecked();
    setLoading(false);
    router.refresh();
  };

  const handleComplete = async () => {
    setLoading(true);
    await completeMultiple(checkedItems);
    resetChecked();
    setLoading(false);
    router.refresh();
  };

  if (checkedItems.length === 0) return null;

  return (
    <>
      <LoadingOverlay
        loaderProps={{ children: <Loader type="dots" /> }}
        visible={loading}
      />
      <Menu trigger="hover" withArrow>
        <Menu.Target>
          <ActionIcon>
            <FaAlignJustify />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Checked Items: {checkedItems.length}</Menu.Label>
          <Menu.Item onClick={handleDelete} leftSection={<FaTrash />}>
            Delete
          </Menu.Item>
          <Menu.Item onClick={handleComplete} leftSection={<FaCheck />}>
            Complete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
