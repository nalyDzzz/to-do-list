import {
  Avatar,
  Container,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuLabel,
  MenuItem,
  Anchor,
} from '@mantine/core';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className="">
      <Container fluid className="flex justify-end p-4">
        <Menu>
          <MenuTarget>
            <Anchor>
              <Avatar src={session?.user?.image} />
            </Anchor>
          </MenuTarget>
          <MenuDropdown>
            <MenuLabel>Options</MenuLabel>
            <MenuItem>Toggle Theme</MenuItem>
            <MenuItem component='a' href="/api/auth/signout">Sign out</MenuItem>
          </MenuDropdown>
        </Menu>
      </Container>
    </header>
  );
}
