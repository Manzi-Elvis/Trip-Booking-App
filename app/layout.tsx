import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/app/providers"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Transport Ticketing Platform",
  description: "Book and manage your transport tickets in Rwanda",
    generator: 'next.js',
    applicationName: 'Transport Ticketing Platform',
    keywords: ['Transport', 'Ticketing', 'Rwanda', 'Booking', 'Management'],
    authors: [{ name: 'MRE Corp', url: 'https://mrelvis.vercel.app' }],
    colorScheme: 'light dark',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <Providers>
          <div className="flex h-screen flex-col lg:flex-row">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Navigation />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
