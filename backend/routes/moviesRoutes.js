import express from "express";
import {
  createMovie,
  deleteComment,
  deleteMovie,
  getAllMovies,
  getNewMovies,
  getRandomMovies,
  getSpecificMovie,
  getTopMovies,
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
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

router.post("/:id/reviews", authenticate, checkId, movieReview);

router.post("/create-movie", authenticate, authorizedAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizedAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizedAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizedAdmin, deleteComment);

export default router;
