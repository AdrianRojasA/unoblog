import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '../lib/providers/AuthProvider'
import ThemeContextProvider from '../lib/providers/ThemeProvider'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'


import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UnoBlog',
  description: 'A Blog for UnoSquare Developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <div className="container">
              <div className="wrapper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
