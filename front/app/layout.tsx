import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Garden Tally',
  description: 'Easily track plants and harvests',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=' bg-gray-50 text-gray-700'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
