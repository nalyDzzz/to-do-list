import { Container, Loader, Text, Title } from '@mantine/core';
import React, { Suspense } from 'react';

import { getServerSession } from 'next-auth';
import CompleteSelected from '@/app/_components/CompleteSelected';
import AddItem from '@/app/_components/AddItem';
import TodoContainer from '../_components/TodoContainer';

export default async function Page() {
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
      <Suspense
        fallback={
          <div className="text-center pt-10">
            <Loader />
          </div>
        }
      >
        <TodoContainer />
      </Suspense>
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
