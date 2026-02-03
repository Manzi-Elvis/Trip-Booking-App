"use client"

import type { Seat } from "@/lib/api-types"

interface SeatGridProps {
  seats: Seat[]
  selectedSeats: string[]
  onSelectSeat: (seatId: string) => void
}

export function SeatGrid({ seats, selectedSeats, onSelectSeat }: SeatGridProps) {
  // Group seats by row
  const rows: { [key: string]: Seat[] } = {}
  seats.forEach((seat) => {
    const row = seat.id.charAt(0)
    if (!rows[row]) rows[row] = []
    rows[row].push(seat)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-surface border-2 border-border"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-foreground-muted"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary"></div>
          <span>Selected</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Front of bus indicator */}
        <div className="text-xs font-semibold text-foreground-muted">FRONT</div>

        {/* Seat Grid */}
        <div className="flex flex-col gap-3 bg-surface p-6 rounded-lg border border-border">
          {Object.entries(rows).map(([row, rowSeats]) => (
            <div key={row} className="flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-foreground-muted w-6 text-center">{row}</span>

              <div className="flex gap-3">
                {/* Left 2 seats */}
                <div className="flex gap-2">
                  {rowSeats.slice(0, 2).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => {
                        if (seat.status !== "booked") {
                          onSelectSeat(seat.id)
                        }
                      }}
                      disabled={seat.status === "booked"}
                      className={`w-10 h-10 rounded font-semibold text-xs transition-all ${
                        seat.status === "booked"
                          ? "bg-foreground-muted cursor-not-allowed opacity-50"
                          : selectedSeats.includes(seat.id)
                            ? "bg-primary text-white border-2 border-primary"
                            : "bg-surface border-2 border-border hover:border-primary cursor-pointer"
                      }`}
                    >
                      {seat.id.charAt(1)}
                    </button>
                  ))}
                </div>

                {/* Aisle space */}
                <div className="w-3"></div>

                {/* Right 2 seats */}
                <div className="flex gap-2">
                  {rowSeats.slice(2, 4).map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => {
                        if (seat.status !== "booked") {
                          onSelectSeat(seat.id)
                        }
                      }}
                      disabled={seat.status === "booked"}
                      className={`w-10 h-10 rounded font-semibold text-xs transition-all ${
                        seat.status === "booked"
                          ? "bg-foreground-muted cursor-not-allowed opacity-50"
                          : selectedSeats.includes(seat.id)
                            ? "bg-primary text-white border-2 border-primary"
                            : "bg-surface border-2 border-border hover:border-primary cursor-pointer"
                      }`}
                    >
                      {seat.id.charAt(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back of bus indicator */}
        <div className="text-xs font-semibold text-foreground-muted">BACK</div>
      </div>
    </div>
  )
}
