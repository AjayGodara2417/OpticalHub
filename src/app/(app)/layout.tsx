// src/app/(app)/layout.tsx
import { ReactNode } from "react"
import Link from "next/link"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Optical Hub</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-gray-100 p-2 rounded">Dashboard</Link>
          <Link href="/inventory" className="hover:bg-gray-100 p-2 rounded">Inventory</Link>
          <Link href="/billing" className="hover:bg-gray-100 p-2 rounded">Billing</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4">
          <h2 className="text-lg font-semibold">Welcome Back</h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
