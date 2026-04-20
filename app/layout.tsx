import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const _notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-noto-jp" });

export const metadata: Metadata = {
  title: 'Nihon Study Hub — Japanese Learning Tools',
  description: 'Your one-stop hub for learning Japanese — Kanji writing, study tools, quizzes, and listening practice.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="bg-background">
      <body className={`${_notoSansJP.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
