"use client"

import { useState } from "react"
import { TextField, Button, Alert, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

const LoginForm = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const email = event.target[0].value
      const password = event.target[2].value
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/")
      } else {
        setError(data.error)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "2rem 1rem",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={isLoading}
        fullWidth
        sx={{
          mt: 1,
        }}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          style={{
            marginTop: "1rem",
          }}
        >
          {error}
        </Alert>
      )}
    </form>
  )
}

export default LoginForm
