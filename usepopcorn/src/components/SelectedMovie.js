import { useState, useEffect } from "react";
import Loader from "./Loader.js";
import StarRating from "../starRating.js";
const KEY = `c50aeeb7`;

export default function SelectedMovie({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watchedMovies,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
    const watchedIds = watchedMovies.map((el) => el.imdbID);
    const isWatched = watchedIds.includes(selectedId);

    let watchedMovie = "";
    // this is good way of destructuring! read more about it if it is needed

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;
    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        };
        onAddWatched(newMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            function callBack(e) {
                if (e.code === "Escape") {
                    onCloseMovie();
                    console.log("Closing");
                }
            }
            document.addEventListener("keydown", callBack);
            return function () {
                document.removeEventListener("keydown", callBack);
            };
        },
        [onCloseMovie]
    );
    useEffect(
        function () {
            setIsLoading(true);
            async function getMovieDetails() {
                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await response.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    useEffect(
        function () {
            if (!title) return;
            document.title = `MOVIE | ${title}`;
            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
    );

    if (isWatched)
        watchedMovie = watchedMovies.filter(
            (movie) => movie.imdbID === selectedId
        );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt="movie poster" />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>🌟</span>
                                {imdbRating} IMDB Rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {watchedMovie ? (
                                `You already rated this movie ${watchedMovie[0].userRating} 🌟`
                            ) : (
                                <StarRating
                                    size={24}
                                    maxRating={10}
                                    onSetRating={setUserRating}
                                />
                            )}

                            {userRating > 0 && (
                                <button className="btn-add" onClick={handleAdd}>
                                    + Add to list
                                </button>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by: {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
