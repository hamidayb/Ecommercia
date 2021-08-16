import express from "express"
import path from "path"
import dotenv from "dotenv"
import morgan from "morgan"
import Connect_DB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, error } from "./middleware/errorMiddleware.js"
import colors from "colors"

// configuration of .env file and puts all those environment variables in process.env
dotenv.config()

Connect_DB()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

// API Requests
app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

// Middleware

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
// handle error if wrong url``
app.use(notFound)
// change error status of 200 in case to 500
app.use(error)

// Listening
const port = process.env.PORT || 5000 // assign port what is in the PORT, if there's nothing in PORT then assign 5000 to port
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode & Listening  on port ${port}`
      .yellow.bold
  )
)
