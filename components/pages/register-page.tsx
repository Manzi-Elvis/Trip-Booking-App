"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { UserPlus, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useRegister } from "@/lib/api-hooks"
import { toast } from "sonner"

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const registerMutation = useRegister()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (!agreedToTerms) {
      setError("You must agree to the terms of service")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    registerMutation.mutate(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      },
      {
        onSuccess: (data) => {
          toast.success("Account created successfully!")
          setTimeout(() => router.push("/"), 500)
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || "Registration failed. Please try again.")
          toast.error("Registration failed")
        },
      },
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-linear-to-br from-surface to-background">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
          <p className="text-foreground-muted">Join Rwanda's leading transport platform</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            name="name"
            disabled={registerMutation.isPending}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            name="email"
            disabled={registerMutation.isPending}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+250..."
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            disabled={registerMutation.isPending}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            disabled={registerMutation.isPending}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            disabled={registerMutation.isPending}
            required
          />

          <div className="flex items-start gap-2 text-xs text-foreground-muted">
            <input
              type="checkbox"
              className="rounded mt-1"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={registerMutation.isPending}
              required
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={registerMutation.isPending || !agreedToTerms}>
            <UserPlus className="mr-2 h-4 w-4" />
            {registerMutation.isPending ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary-light transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
