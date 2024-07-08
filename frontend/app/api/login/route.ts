import { NextRequest, NextResponse } from "next/server"
import { signInWithEmailAndPassword } from "firebase/auth"
import { setCookie } from "cookies-next"
import { auth } from "@config/firebaseConfig"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const token = await userCredential.user.getIdToken()

    const response = NextResponse.json({ message: "Login successful" })

    // Set the token as a cookie
    setCookie("token", token, { req: request, res: response })

    return response
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 })
  }
}
