import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Title,
  Text,
} from '@mantine/core';
import { ListItem } from './ListItem';
import { getAllTodos } from '@/utils/dbQueries';

export default async function TodoContainer() {
  const todos = await getAllTodos();

  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <>
      <Box className="flex flex-col gap-3">
        {completedTodos.length < 1 && uncompletedTodos.length < 1 && (
          <Text c="dimmed" className="text-center">
            You have not added any to do&apos;s yet!
          </Text>
        )}
        {uncompletedTodos.length < 1 && completedTodos.length >= 1 && (
          <Text c="dimmed" className="text-center">
            You&apos;ve completed all your to do&apos;s!
          </Text>
        )}
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
                {completedTodos.length < 1 && (
                  <Text c="dimmed" className="text-center">
                    You haven&apos;t completed any to do&apos;s yet!
                  </Text>
                )}
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
