import { useEffect, useState } from "react";
import StarRating from "./starRating.js";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = `c50aeeb7`;
// const KEY = "dfd43ff9";

export default function App() {
    const [query, setQuery] = useState("");
    const [watched, setWatched] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    function handleSelecMovie(id) {
        setSelectedId((prevId) => (prevId === id ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        setWatched((prevMovies) => [...prevMovies, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                    );
                    if (!response.ok) {
                        throw new Error(
                            "something went wrong with fetching movies"
                        );
                    }

                    const data = await response.json();
                    if (data.Response === "False") {
                        throw new Error("Movie not found");
                    }
                    setMovies(data.Search);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            fetchMovies();
        },
        [query]
    );
    return (
        <>
            <Navbar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMOvie={handleSelecMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <SelectedMovie
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatchedMovie}
                            watchedMovies={watched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDelete={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

function Loader() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return <p className="error">{message}</p>;
}

function Navbar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function MovieList({ movies, onSelectMOvie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieElement
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMOvie={onSelectMOvie}
                />
            ))}
        </ul>
    );
}

function MovieElement({ movie, onSelectMOvie }) {
    return (
        <li onClick={() => onSelectMOvie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function SelectedMovie({
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
function Summary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{Math.round(avgImdbRating)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{Math.round(avgUserRating)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{Math.round(avgRuntime)} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMovieList({ watched, onDelete }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovieElement
                    key={movie.imdbID}
                    movie={movie}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

function WatchedMovieElement({ movie, onDelete }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>

                <button
                    className="btn-delete"
                    onClick={() => onDelete(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
