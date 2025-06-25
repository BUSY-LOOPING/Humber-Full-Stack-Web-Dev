import express from "express";
const router = express.Router();

import movies from "./controller.js";


router.get("/", movies.getAllMovies);

router.get("/update", movies.updateMovieRating);

router.get("/delete", movies.deleteMovieByRating);

export default router;