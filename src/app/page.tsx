import { Button, Container, Group, Text } from '@mantine/core';

export default function Home() {
  return (
    <div>
      <Container size={700}>
        <h1>
          Landing Page
        </h1>

        <Text c="dimmed">
          Build fully functional accessible web applications with ease – Mantine
          includes more than 100 customizable components and hooks to cover you
          in any situation
        </Text>

        <Group>
          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>

          <Button
            component="a"
            size="xl"
            variant="default"
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
