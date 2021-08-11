import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
} from "../controller/userController.js"
import { protect, isAdmin } from "../middleware/userAuthMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser)

export default router
