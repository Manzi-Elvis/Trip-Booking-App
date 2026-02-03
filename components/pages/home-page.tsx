"use client"
import { SearchForm } from "@/components/search-form"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"

export function HomePage() {
  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="rounded-2xl bg-linear-to-r from-primary via-primary-dark to-primary p-8 md:p-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Trip Today</h1>
          <p className="text-primary-light text-lg md:text-xl">Fast, safe, and affordable transport across Rwanda</p>
        </div>
      </div>

      {/* Search Form */}
      <div>
        <SearchForm />
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-foreground">Why Choose Us</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard icon={TrendingUp} value="250+" label="Daily Trips" color="primary" />
          <StatsCard icon={MapPin} value="15+" label="Cities Covered" color="primary" />
          <StatsCard icon={Users} value="50K+" label="Happy Passengers" color="primary" />
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Popular Routes</h2>
        <p className="text-foreground-muted mb-6">Explore our most traveled routes and book your next adventure</p>
        <Link href="/trips">
          <Button className="bg-primary hover:bg-primary-dark text-white">
            <Clock className="w-4 h-4 mr-2" />
            View All Trips
          </Button>
        </Link>
      </div>
    </div>
  )
}
