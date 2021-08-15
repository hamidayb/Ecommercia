import express from "express"
import {
  addOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  deleteOrder,
  updateOrderToDelivered,
} from "../controller/orderController.js"
import { protect, isAdmin } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(protect, addOrder).get(protect, isAdmin, getAllOrders)
router.route("/myorders").get(protect, getMyOrders)
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, isAdmin, deleteOrder)
  .put(protect, isAdmin)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, updateOrderToDelivered)

export default router
