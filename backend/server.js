const express = require("express")
const products = require("./data/products")

const app = express()
const port = 5000 // assign port what is in the PORT, if there's nothing in PORT then assign 5000 to port

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
app.listen(port, console.log(`Listening on port ${port}`))
