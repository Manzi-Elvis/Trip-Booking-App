"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { LogIn, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLogin } from "@/lib/api-hooks"
import { toast } from "sonner"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const loginMutation = useLogin()

  const validateForm = () => {
    if (!email) {
      setError("Email is required")
      return false
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return false
    }
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    return true
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email)
          }
          toast.success("Welcome back! Redirecting...")
          setTimeout(() => router.push("/"), 500)
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || "Login failed. Please try again.")
          toast.error("Login failed")
        },
      },
    )
  }

  useState(() => {
    const remembered = localStorage.getItem("rememberedEmail")
    if (remembered) setEmail(remembered)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-surface to-background">
      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
          <p className="text-foreground-muted">Sign in to your account to continue</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loginMutation.isPending}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginMutation.isPending}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loginMutation.isPending}
              />
              <span className="text-foreground-muted">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:text-primary-light transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={loginMutation.isPending}>
            <LogIn className="mr-2 h-4 w-4" />
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground-muted mb-2">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:text-primary-light transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
