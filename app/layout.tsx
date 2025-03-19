import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import AppSidebar from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ChoreBoard",
  description: "Track chores for you and your flatmates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="min-h-screen bg-background">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

