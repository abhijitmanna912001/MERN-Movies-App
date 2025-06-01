import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getSpecificMovie,
  movieReview,
  updateMovie,
} from "../controllers/movieController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);

router.post("/:id/reviews", authenticate, checkId, movieReview);

router.post("/create-movie", authenticate, authorizedAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizedAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizedAdmin, deleteMovie);

export default router;
