import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: String
});
const Movie = mongoose.model("Movie", MovieSchema, "movies");

async function initializeMovies() {
    let movies = [
        {
            title: "Spiderman",
            year: 2022,
            rating: "G",
        },
        {
            title: "Marvel Endgame",
            year: 2023,
            rating: "PG",
        },
        {
            title: "Marvel Inifinity War",
            year: 2022,
            rating: "PG-13",
        },
        {
            title: "Inception",
            year: 2010,
            rating: "PG-13",
        }
    ];

    await Movie.insertMany(movies);
}

async function getMovies() {
    return await Movie.find({});
}

async function updateMovieRating(title, newRating) {
    let result = await Movie.updateOne(
        {title: title},
        {rating: newRating}
    ); 
    return result;
}

async function deleteMoviesByRating(rating) {
    const result = await Movie.deleteMany({rating: rating});
    return result;
}

export default {
    initializeMovies,
    getMovies,
    updateMovieRating,
    deleteMoviesByRating
};