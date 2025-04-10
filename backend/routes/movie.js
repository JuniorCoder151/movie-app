const express = require("express");
const router = express.Router();

const MoviesController = require("../controller/movie");
const authMiddleware = require("../models/auth");

// Protect all routes below with token authentication
router.use(authMiddleware);
router.get("/genres", MoviesController.getAllGenres);
router.get("/trending", MoviesController.getTrendingMovies);
router.get("/top-rate", MoviesController.getTopRatedMovies);
router.get("/discover", MoviesController.getMoviesByGenre);
router.post("/video", MoviesController.getTrailerByFilmId);
router.post("/search", MoviesController.getMoviebySearch);

module.exports = router;
