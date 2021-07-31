import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// @desc        Fetch all products
// @route       /api/products
// @access      public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc        Fetch a single product
// @route       /api/products/:id
// @access      public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error(`Product not found!`)
  }
})
