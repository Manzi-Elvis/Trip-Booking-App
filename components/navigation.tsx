"use client"
import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-surface">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="text-lg font-bold text-primary">RwandaTransit</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="rounded-lg p-2 hover:bg-surface-light transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
