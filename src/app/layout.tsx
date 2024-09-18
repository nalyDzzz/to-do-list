import '@mantine/core/styles.css';
import './globals.css';
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
  MantineColorsTuple,
} from '@mantine/core';
import Header from '@/components/Header';

const primary: MantineColorsTuple = [
  '#faf1fe',
  '#ebe1ef',
  '#d2c3d9',
  '#b7a1c2',
  '#a184af',
  '#9472a3',
  '#8d6a9f',
  '#79598b',
  '#6d4e7d',
  '#60426f',
];

const secondary: MantineColorsTuple = [
  '#f2f8ee',
  '#e6ede2',
  '#cbd9c4',
  '#aec3a3',
  '#95b187',
  '#86a575',
  '#7da06b',
  '#6a8c59',
  '#5d7c4d',
  '#4d6c3f',
];


const theme = createTheme({
  colors: {
    primary,
    secondary,
  },
  primaryColor: 'primary'
});

export const metadata = {
  title: 'To Do List',
  description: 'To Do List Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto" theme={theme} withStaticClasses={false}>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
