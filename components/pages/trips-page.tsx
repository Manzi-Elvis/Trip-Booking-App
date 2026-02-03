"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TripListCard } from "@/components/trip-list-card"
import { PageHeader } from "@/components/page-header"
import { Filter, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { dummyTrips } from "@/lib/dummy-data"
import { useTrips } from "@/lib/api-hooks"
import { toast } from "sonner"

export function TripsPage() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("price")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""

  const { data: trips = dummyTrips, isLoading, error } = useTrips(from, to, date)

  const filteredAndSortedTrips = useMemo(() => {
    let result = [...trips]

    // Filter by price
    result = result.filter((trip) => trip.price >= priceRange.min && trip.price <= priceRange.max)

    // Sort
    switch (sortBy) {
      case "price":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "departure":
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
        break
      case "duration":
        result.sort((a, b) => {
          const aDuration = Number.parseInt(a.duration)
          const bDuration = Number.parseInt(b.duration)
          return aDuration - bDuration
        })
        break
      default:
        break
    }

    return result
  }, [trips, sortBy, priceRange])

  const handleClearFilters = () => {
    setSortBy("price")
    setPriceRange({ min: 0, max: 10000 })
    toast.success("Filters cleared")
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <PageHeader
          title="Available Trips"
          description={from && to ? `From ${from} to ${to}` : "Find and book your ideal trip"}
        />
      </div>

      {/* Filter Card */}
      <Card className="sticky top-0 z-20">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filter & Sort</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {/* Sort Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-foreground mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="departure">Earliest Departure</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-foreground mb-2">Max Price</label>
            <Input
              type="number"
              placeholder="10000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) || 10000 })}
            />
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <Button variant="secondary" fullWidth onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive bg-destructive/10 p-4">
          <p className="text-destructive">Failed to load trips. Please try again.</p>
        </Card>
      )}

      {/* Trips List */}
      {!isLoading && !error && (
        <div>
          <p className="text-sm text-foreground-muted mb-4">
            {filteredAndSortedTrips.length} trip{filteredAndSortedTrips.length !== 1 ? "s" : ""} available
          </p>

          {filteredAndSortedTrips.length > 0 ? (
            <div className="space-y-4">
              {filteredAndSortedTrips.map((trip) => (
                <TripListCard key={trip.id} {...trip} />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-foreground-muted mb-4 opacity-50" />
              <p className="text-foreground-muted text-center">No trips found for the selected filters.</p>
              <p className="text-foreground-muted text-sm text-center mt-2">
                Try adjusting your search criteria or selecting different dates.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
