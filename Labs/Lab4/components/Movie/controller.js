import { request } from "express";
import movieModel from "./model.js";

const getAllMovies = async (request, response) => {
    let movieList = await movieModel.getMovies();

    if (!movieList.length) {
        await movieModel.initializeMovies();

        movieList = await movieModel.getMovies();
    }
    response.render("index", {movies: movieList});
};

const updateMovieRating = async (request, response) => {
    const title = "Spiderman";  
    const newRating = "PG-13";    

    const result = await movieModel.updateMovieRating(title, newRating);
    if (result.modifiedCount > 0) {
        console.log(`Updated rating for '${title}' to '${newRating}'.`);
    } else {
        console.log(`No movie found or rating already set to '${newRating}'.`);
    }

    response.redirect("/");
};

const deleteMovieByRating = async (request, response) => {
    const ratingToDelete = "PG-13";
    const result = await movieModel.deleteMoviesByRating(ratingToDelete);
    if (result.modifiedCount > 0) {
        console.log(`Deleted ${result.modifiedCount} records`);
    } else {
        console.log(`None deleted.`);
    }
    response.redirect("/");
};

export default {
    getAllMovies,
    updateMovieRating,
    deleteMovieByRating
}