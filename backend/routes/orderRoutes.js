import express from "express"
import { addOrder, getOrderById } from "../controller/orderController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(protect, addOrder)
router.route("/:id").get(protect, getOrderById)

export default router
