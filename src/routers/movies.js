const express = require("express");
const {
  getMovies,
  newMovie,
  getMovieById,
  updateMovie,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", newMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);

module.exports = router;
