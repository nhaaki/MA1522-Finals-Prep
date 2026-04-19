import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MA1522 Revision Hub',
  description:
    'A clean, focused companion for revising MA1522 — Linear Algebra for Computing at NUS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
