class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg)
  }

  static unauthorized(msg: string) {
    return new ApiError(401, msg)
  }
}

export default ApiError
