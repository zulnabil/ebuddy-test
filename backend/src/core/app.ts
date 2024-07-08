import express from "express"
import dotenv from "dotenv"

import bodyParser from "body-parser"
import userRoutes from "@routes/userRoutes"
import ApiError from "@entities/ApiError"

dotenv.config()
const app = express()

app.use(bodyParser.json())

app.use("/api", userRoutes)

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.statusCode || 500).send({ error: err.message })
  }
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
