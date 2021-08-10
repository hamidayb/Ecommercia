import Cart from "../models/cartModel.js"
import asyncHandler from "express-async-handler"

// @desc        Create & add items to cart
// @route       /api/cart
// @access      private
export const addToCart = asyncHandler(async (req, res) => {
  const { cartItem } = req.body
  if (!cartItem) {
    res.status(400)
    throw new Error("Item not added in cart")
  } else {
    const cart = (await Cart.find({ user: req.user._id }))[0]
    if (cart) {
      const newCart = [...cart.cartItems, cartItem]
      cart.cartItems = newCart
      const updatedCart = await cart.save()
      res.status(201)
      res.json({ updatedCart })
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: cartItem,
      })
      const updatedCart = await cart.save()
      res.status(201)
      res.json(updatedCart)
    }
  }
})
