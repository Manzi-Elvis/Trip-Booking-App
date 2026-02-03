"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightLeft, MapPin, Calendar, Clock } from "lucide-react"
import { toast } from "sonner"

const POPULAR_ROUTES = ["Kigali", "Huye", "Gitarama", "Gisenyi", "Musanze", "Muhanga", "Nyagatare", "Rusizi"]

export function SearchForm() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const router = useRouter()

  const filteredFromSuggestions = POPULAR_ROUTES.filter(
    (route) => route.toLowerCase().includes(from.toLowerCase()) && from.length > 0,
  )

  const filteredToSuggestions = POPULAR_ROUTES.filter(
    (route) => route.toLowerCase().includes(to.toLowerCase()) && to.length > 0 && route !== from,
  )

  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!from || !to || !date) {
      toast.error("Please fill in all search fields")
      return
    }

    if (from === to) {
      toast.error("Departure and arrival cities must be different")
      return
    }

    const params = new URLSearchParams({
      from,
      to,
      date,
    })
    router.push(`/trips?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Search Trips</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* From Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              From
            </label>
            <div className="relative">
              <Input
                placeholder="Departure city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => setShowFromSuggestions(true)}
                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                className="pl-10"
              />
              {showFromSuggestions && filteredFromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                  {filteredFromSuggestions.map((route) => (
                    <button
                      key={route}
                      type="button"
                      onClick={() => {
                        setFrom(route)
                        setShowFromSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-surface transition-colors text-foreground text-sm first:rounded-t-lg last:rounded-b-lg"
                    >
                      {route}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* To Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              To
            </label>
            <div className="relative">
              <Input
                placeholder="Destination city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                className="pl-10"
              />
              {showToSuggestions && filteredToSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                  {filteredToSuggestions.map((route) => (
                    <button
                      key={route}
                      type="button"
                      onClick={() => {
                        setTo(route)
                        setShowToSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-surface transition-colors text-foreground text-sm first:rounded-t-lg last:rounded-b-lg"
                    >
                      {route}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button - hidden on mobile */}
          <div className="hidden md:flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
              aria-label="Swap locations"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="pl-10"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full md:col-span-1 bg-primary hover:bg-primary-dark text-white py-6 md:py-0"
          >
            <Clock className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Popular Routes on Mobile */}
        <div className="mt-4 md:hidden">
          <p className="text-xs text-foreground-muted mb-2">Popular routes:</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ROUTES.slice(0, 4).map((route) => (
              <button
                key={route}
                type="button"
                onClick={() => {
                  if (!from) setFrom(route)
                  else if (!to) setTo(route)
                }}
                className="px-3 py-1 text-xs bg-surface border border-border rounded-full hover:border-primary transition-colors text-foreground"
              >
                {route}
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
