"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Ticket, BarChart3, X, Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trips", label: "Find Trips", icon: MapPin },
  { href: "/bookings", label: "My Bookings", icon: Ticket },
  { href: "/admin", label: "Admin", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-surface transition-transform duration-300 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4 lg:hidden">
          <h1 className="font-bold text-primary">Menu</h1>
          <button onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  active ? "bg-primary text-white" : "text-foreground-muted hover:bg-surface-light"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden rounded-full bg-primary p-4 text-white shadow-lg hover:bg-primary-dark sm:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  )
}
