import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { ListItem } from '@/app/_components/ListItem';
import { getAllTodos } from '@/utils/dbQueries';
import { getServerSession } from 'next-auth';
import CompleteSelected from '@/app/_components/CompleteSelected';
import AddItem from '@/app/_components/AddItem';

export default async function Page() {
  const todos = await getAllTodos();
  const session = await getServerSession();

  return (
    <Container className="flex flex-col gap-2">
      <Title>
        {ResponsiveTitle()}, {session?.user?.name}!
      </Title>
      <Text c="dimmed">What&#39;s on the to do list for the day?</Text>
      <div className="grid md:grid-cols-[min-content_1fr] gap-2 md:gap-0">
        <CompleteSelected />
        <AddItem />
      </div>
      <Box className="flex flex-col gap-3">
        {todos.map((el) => {
          if (!el.completed) {
            return (
              <ListItem
                key={el.id}
                content={el.content}
                id={el.id}
                completed={el.completed}
              />
            );
          }
        })}
      </Box>
      <Box className="pt-4">
        <Accordion>
          <AccordionItem value="completed-todos">
            <AccordionControl>
              <Title order={4}>Completed</Title>
            </AccordionControl>
            <AccordionPanel>
              <Box className="gap-2 flex flex-col">
                {todos.map((el) => {
                  if (el.completed) {
                    return (
                      <ListItem
                        key={el.id}
                        content={el.content}
                        id={el.id}
                        completed={el.completed}
                      />
                    );
                  }
                })}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
}

function ResponsiveTitle() {
  const date = new Date();
  const hours = date.getHours();

  if (hours > 0 && hours < 12) {
    return 'Good Morning';
  } else if (hours > 12 && hours < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}
