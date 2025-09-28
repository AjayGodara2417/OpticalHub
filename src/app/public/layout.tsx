// src/app/(public)/layout.tsx
import { ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {children}
    </div>
  )
}
