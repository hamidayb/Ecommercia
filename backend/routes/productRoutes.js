import express from "express"
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controller/productController.js"
import { protect, isAdmin } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protect, isAdmin, createProduct)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)
router.route("/:id/reviews").post(protect, createProductReview)

export default router
