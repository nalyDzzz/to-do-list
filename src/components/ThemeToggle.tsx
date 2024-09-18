'use client'
import { MenuItem, useMantineColorScheme } from '@mantine/core';
import React from 'react'

type Props = {}

export default function ThemeToggle({}: Props) {
    const { toggleColorScheme } = useMantineColorScheme();
  return <MenuItem onClick={() => toggleColorScheme()}>Toggle Theme</MenuItem>;
}