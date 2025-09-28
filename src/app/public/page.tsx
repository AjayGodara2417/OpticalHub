// src/app/(public)/page.tsx
import Link from "next/link"

const features = [
  { title: "Dashboard", description: "View analytics and reports", href: "/dashboard" },
  { title: "Inventory", description: "Manage frames, lenses, and stock", href: "/inventory" },
  { title: "Billing", description: "Create and manage bills", href: "/billing" },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {features.map((feature) => (
        <Link
          key={feature.title}
          href={feature.href}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
          <p className="text-gray-500 mt-2">{feature.description}</p>
        </Link>
      ))}
    </div>
  )
}
