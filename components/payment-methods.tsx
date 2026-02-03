"use client"

import { Card } from "@/components/ui/card"

interface PaymentMethodsProps {
  selectedMethod: string
  onSelect: (method: string) => void
}

export function PaymentMethods({ selectedMethod, onSelect }: PaymentMethodsProps) {
  const methods = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      description: "Pay via MTN MoMo",
      icon: "📱",
    },
    {
      id: "airtel",
      name: "Airtel Money",
      description: "Pay via Airtel Money",
      icon: "💳",
    },
    {
      id: "cash",
      name: "Pay at Boarding",
      description: "Pay cash when boarding",
      icon: "💵",
    },
  ]

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <Card
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`cursor-pointer transition-all ${
            selectedMethod === method.id ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary"
          }`}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onSelect(method.id)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{method.name}</p>
              <p className="text-sm text-foreground-muted">{method.description}</p>
            </div>
            <span className="text-2xl">{method.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
