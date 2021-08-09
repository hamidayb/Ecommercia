import express from "express"
import {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controller/orderController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(protect, addOrder)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
export default router
