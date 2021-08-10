import express from "express"
import { addToCart } from "../controller/cartController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").get(protect, addToCart)

export default router