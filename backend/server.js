import express from "express"
import dotenv from "dotenv"
import products from "./data/products.js"

// configuration of .env file and puts all those environment variables in process.env
dotenv.config()

const app = express()

// API Requests
app.get("/", (req, res) => {
  res.send("API is running")
})
//sending whole products as json
app.get("/api/products", (req, res) => {
  // you can use res.send() as well
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

// Listening
const port = process.env.PORT || 5000 // assign port what is in the PORT, if there's nothing in PORT then assign 5000 to port
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode & Listening  on port ${port}`
  )
)
