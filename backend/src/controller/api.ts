import { Request, Response, NextFunction } from "express"
import { auth } from "@config/firebaseConfig"
import ApiError from "@entities/ApiError"

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = (req as any).user.uid // Extracted from middleware
    const { email, displayName, photoURL, phoneNumber, password } = req.body

    // Prepare update data
    const updateData: any = {}
    if (email) updateData.email = email
    if (displayName) updateData.displayName = displayName
    if (photoURL) updateData.photoURL = photoURL
    if (phoneNumber) updateData.phoneNumber = phoneNumber
    if (password) updateData.password = password

    // Update user details in Firebase Authentication
    const userRecord = await auth.updateUser(uid, updateData)

    res.status(200).send({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
      disabled: userRecord.disabled,
      metadata: userRecord.metadata,
      providerData: userRecord.providerData,
    })
  } catch (error) {
    next(error)
  }
}

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = (req as any).user.uid // Extracted from middleware

    const userRecord = await auth.getUser(uid)

    if (!userRecord) {
      throw ApiError.badRequest("User not found")
    }

    res.status(200).send({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
      disabled: userRecord.disabled,
      metadata: userRecord.metadata,
      providerData: userRecord.providerData,
    })
  } catch (error) {
    next(error)
  }
}

export { updateUser, fetchUser }
