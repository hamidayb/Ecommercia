import express from "express"
import { addToCart, getFromCart } from "../controller/cartController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(protect, addToCart)
router.route("/mycart").get(protect, getFromCart)

export default router
