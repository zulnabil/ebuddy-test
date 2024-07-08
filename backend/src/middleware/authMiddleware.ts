// authMiddleware.ts
import { Request, Response, NextFunction } from "express"
import { auth } from "@config/firebaseConfig"
import ApiError from "@entities/ApiError"

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return next(ApiError.unauthorized("No token provided"))
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    ;(req as any).user = decodedToken
    next()
  } catch (error) {
    return next(ApiError.unauthorized("Invalid token"))
  }
}

export default authMiddleware
