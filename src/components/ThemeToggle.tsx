'use client'
import { MenuItem, useMantineColorScheme } from '@mantine/core';
import React from 'react'



export default function ThemeToggle() {
    const { toggleColorScheme } = useMantineColorScheme();
  return <MenuItem onClick={() => toggleColorScheme()}>Toggle Theme</MenuItem>;
}