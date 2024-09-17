import {
  Button,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';

import { ListItem } from '@/components/ListItem'

export default function Page() {
  

  return (
    <Container className="flex flex-col gap-2">
      <Title>Good Morning!</Title>
      <Text c="dimmed">What&#39;s on the to do list for the day?</Text>
      <Group>
        <TextInput w={'50%'} placeholder="Add item" />
        <Button>Add to List</Button>
      </Group>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </Container>
  );
}
