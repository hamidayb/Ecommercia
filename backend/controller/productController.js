import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// @desc        Fetch all products
// @route       /api/products
// @access      public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // for case insensitive
        },
      }
    : {}
  const products = await Product.find({ ...keyword })
  console.log(products)
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

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = Product.findById(req.params.id)
  if (product) {
    await product.deleteOne()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create product
// @route   /api/products/
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "sample.img",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  })
  const createdPrduct = await product.save()
  res.status(201).json(createdPrduct)
})

// @desc    Update product
// @route   /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.descriptoin = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedPrduct = await product.save()
    res.status(201).json(updatedPrduct)
  } else {
    res.status(404)
    throw new Error("Product Not Found")
  }
})

// @desc    Create Review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product Not Found")
  }
})
