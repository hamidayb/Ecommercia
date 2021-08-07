import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from "../controller/userController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser)

export default router
