// src/app/page.tsx  -> Home Page (NOT dashboard)
'use client'

import Link from 'next/link'
import { ShoppingCart, Boxes, LayoutDashboard, Users, BarChart3, Settings } from 'lucide-react'

const features = [
  {
    href: '/billing',
    title: 'Billing',
    description: 'Create and manage customer invoices quickly.',
    icon: ShoppingCart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    href: '/inventory',
    title: 'Inventory',
    description: 'Track frames, lenses, and accessories with ease.',
    icon: Boxes,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    href: '/dashboard',
    title: 'Dashboard',
    description: 'Get insights on sales, stock, and performance.',
    icon: LayoutDashboard,
    color: 'from-green-500 to-emerald-500',
  },
  {
    href: '/customers',
    title: 'Customers',
    description: 'Manage customer data and prescription records.',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
  },
  {
    href: '/reports',
    title: 'Reports',
    description: 'View detailed sales and inventory analytics.',
    icon: BarChart3,
    color: 'from-orange-500 to-amber-500',
  },
  {
    href: '/settings',
    title: 'Settings',
    description: 'Manage app settings, users, and preferences.',
    icon: Settings,
    color: 'from-gray-500 to-slate-500',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Optical Hub</h1>
        <p className="text-lg text-gray-600">Smart Inventory & Billing for Your Optical Shop</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map(({ href, title, description, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="group relative p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${color} text-white mb-4 group-hover:scale-110 transition`}
            >
              <Icon size={28} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
            <span className="absolute top-4 right-4 text-gray-400 group-hover:text-gray-600 transition">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
