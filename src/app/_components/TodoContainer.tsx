import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Title,
} from '@mantine/core';
import { ListItem } from './ListItem';
import { getAllTodos } from '@/utils/dbQueries';

export default async function TodoContainer() {
  const todos = await getAllTodos();

  return (
    <>
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
    </>
  );
}
