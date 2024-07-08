import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const headers = new Headers()
  headers.append("Authorization", `Bearer ${token}`)

  const backendResponse = await fetch(
    `${process.env.BASE_API_URL}/api/fetch-user-data`,
    {
      method: "GET",
      headers,
    }
  )

  if (!backendResponse.ok) {
    const errorData = await backendResponse.json()
    return NextResponse.json(
      { error: errorData.error },
      { status: backendResponse.status }
    )
  }

  const data = await backendResponse.json()
  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest) => {
  const body = await req.json()
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { email, displayName, photoURL, phoneNumber, password } = body

  const updateData: any = {}
  if (email) updateData.email = email
  if (displayName) updateData.displayName = displayName
  if (photoURL) updateData.photoURL = photoURL
  if (phoneNumber) updateData.phoneNumber = phoneNumber
  if (password) updateData.password = password

  const backendResponse = await axios(
    `${process.env.BASE_API_URL}/api/update-user-data`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: updateData,
    }
  )

  if (!backendResponse?.data) {
    return NextResponse.json(
      { error: backendResponse.data.error },
      { status: backendResponse.status }
    )
  }

  const userRecord = backendResponse.data

  return NextResponse.json({
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    photoURL: userRecord.photoURL,
    phoneNumber: userRecord.phoneNumber,
    disabled: userRecord.disabled,
    metadata: userRecord.metadata,
    providerData: userRecord.providerData,
  })
}
