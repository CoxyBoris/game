import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <SidebarProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <main className="flex flex-1">
              {children}
            </main>
            </Suspense>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
