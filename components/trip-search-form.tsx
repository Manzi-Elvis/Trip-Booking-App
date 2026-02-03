"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRightLeft } from "lucide-react"

interface TripSearchFormProps {
  onSearch?: (data: SearchFormData) => void
}

export interface SearchFormData {
  from: string
  to: string
  date: string
  passengers: number
}

export function TripSearchForm({ onSearch }: TripSearchFormProps) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)

  const handleSwap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = () => {
    if (from && to && date) {
      onSearch?.({ from, to, date, passengers })
    }
  }

  return (
    <Card className="col-span-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Search Trips</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Input label="From" placeholder="Departure city" value={from} onChange={(e) => setFrom(e.target.value)} />
        <button
          onClick={handleSwap}
          className="flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-light transition-colors self-end mb-0 h-11"
          title="Swap cities"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <Input label="To" placeholder="Destination city" value={to} onChange={(e) => setTo(e.target.value)} />
        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <div className="flex items-end">
          <Button onClick={handleSearch} fullWidth>
            <MapPin className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </Card>
  )
}
