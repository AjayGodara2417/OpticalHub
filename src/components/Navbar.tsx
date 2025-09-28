// src/components/Navbar.tsx
'use client'

import { UserCircle2 } from 'lucide-react'

export function Navbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hello, Admin</span>
        <UserCircle2 size={28} className="text-gray-600" />
      </div>
    </header>
  )
}
