import '@mantine/core/styles.css';
import './globals.css';
import Header from '@/components/Header';
import ThemeProvider from './providers';

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
