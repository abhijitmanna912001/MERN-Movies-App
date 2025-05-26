import express from "express";
import {
  createUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

export default router;
