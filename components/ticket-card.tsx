"use client"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import html2canvas from "html2canvas"
import { Download, Share2, Clock } from "lucide-react"
import { toast } from "sonner"

interface TicketCardProps {
  ticketNumber: string
  from: string
  to: string
  departureTime: string
  date: string
  seats: string[]
  busCompany: string
  totalPrice: number
  paymentStatus: "confirmed" | "pending"
}

export function TicketCard({
  ticketNumber,
  from,
  to,
  departureTime,
  date,
  seats,
  busCompany,
  totalPrice,
  paymentStatus,
}: TicketCardProps) {
  const ticketRef = useRef<HTMLDivElement>(null)

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return

    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#1e293b",
        scale: 2,
      })
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `ticket-${ticketNumber}.png`
      link.click()
      toast.success("Ticket downloaded!")
    } catch (error) {
      toast.error("Failed to download ticket")
    }
  }

  const handleShare = () => {
    const text = `My transport ticket: ${ticketNumber} from ${from} to ${to} on ${date}`
    if (navigator.share) {
      navigator.share({
        title: "Transport Ticket",
        text,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast.success("Ticket info copied to clipboard!")
    }
  }

  return (
    <div className="space-y-4">
      {/* Ticket */}
      <div
        ref={ticketRef}
        className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold opacity-75">TICKET NUMBER</p>
              <p className="text-2xl font-bold">{ticketNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold opacity-75">BOOKING DATE</p>
              <p className="font-semibold">{date}</p>
            </div>
          </div>

          {/* Route */}
          <div className="py-6 border-t border-white/20 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-75 mb-1">FROM</p>
                <p className="text-3xl font-bold">{from}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex-1 w-12 h-px bg-white/30"></div>
                <Clock className="w-5 h-5" />
                <div className="flex-1 w-12 h-px bg-white/30"></div>
              </div>

              <div className="text-right">
                <p className="text-sm opacity-75 mb-1">TO</p>
                <p className="text-3xl font-bold">{to}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-75">DEPARTURE TIME</p>
              <p className="text-xl font-bold">{departureTime}</p>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-75">SEATS</p>
              <p className="text-xl font-bold">{seats.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-75">BUS COMPANY</p>
              <p className="text-lg font-bold">{busCompany}</p>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="flex justify-center py-4 border-t border-white/20">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="w-32 h-32 bg-white text-primary flex items-center justify-center rounded font-mono text-xs text-center p-2">
                {ticketNumber}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm opacity-75">
            <p>
              Total Amount: <span className="text-xl font-bold">{totalPrice.toLocaleString()} RWF</span>
            </p>
            <p className="mt-2">
              Payment Status: <span className="font-semibold">{paymentStatus.toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={handleDownloadTicket} className="bg-primary hover:bg-primary-dark text-white">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button onClick={handleShare} variant="secondary">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
