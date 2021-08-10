import Cart from "../models/cartModel.js"
import asyncHandler from "express-async-handler"

// @desc        Create & add items to cart
// @route       /api/cart
// @access      private
export const addToCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body
  if (cartItems && cartItems.length === 0) {
    res.status(400)
    throw new Error("No item in the cart")
  } else {
    const cart = (await Cart.find({ user: req.user._id }))[0]
    if (cart && cart.length !== 0) {
      cart.cartItems = cartItems
      const updatedCart = await cart.save()
      res.status(201)
      res.json(updatedCart)
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems,
      })
      const updatedCart = await newCart.save()
      res.status(201)
      res.json(updatedCart)
    }
  }
})
