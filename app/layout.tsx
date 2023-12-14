import './globals.css'
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './Components/NavBar'
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
 })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance='light' accentColor='violet'>
              <NavBar></NavBar> 
              <main className='p-5'>
                  <Container>
                      {children}
                  </Container>
                </main>
              {false && <ThemePanel></ThemePanel>}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
