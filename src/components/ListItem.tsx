'use client';
import React from 'react';
import {Box, Paper, Text, Group, Button, Checkbox} from '@mantine/core';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useMediaQuery } from '@mantine/hooks';

type Props = {}

export const ListItem = ({}: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Box className="flex flex-col gap-2">
      <Paper
        className="p-2 md:px-5 flex justify-between"
        bg="dark.8"
        radius="md"
      >
        <Group>
          <Checkbox className="" />
          <Text>List item one</Text>
        </Group>
        <Group>
          <Button color="gray.7" leftSection={isDesktop ? <FaPencil /> : false}>
            {isDesktop ? 'Edit' : <FaPencil />}
          </Button>
          <Button color="secondary" leftSection={isDesktop ? <FaTrash /> : false}>
            {isDesktop ? 'Delete' : <FaTrash />}
          </Button>
        </Group>
      </Paper>
    </Box>
  );
}