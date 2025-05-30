import express from "express";
import {
  createGenre,
  getGenres,
  readGenre,
  removeGenre,
  updateGenre,
} from "../controllers/genreController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizedAdmin, createGenre);
router.route("/:id").put(authenticate, authorizedAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizedAdmin, removeGenre);
router.route("/genres").get(getGenres);
router.route("/:id").get(readGenre);

export default router;
