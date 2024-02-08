import { useEffect, useState } from "react";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = `c50aeeb7`;
// const KEY = "dfd43ff9";
const query = `the_crow`;
export default function App() {
    const [watched, setWatched] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(function () {
        async function fetchMovies() {
            try {
                setIsLoading(true);
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
        fetchMovies();
    }, []);
    return (
        <>
            <Navbar>
                <Logo />
                <Search />
                <NumResults movies={movies} />
            </Navbar>

            <Main>
                {/* this is one pattern of not prop drilling*/}
                {/* <Box element={<MovieList movies={movies} />} />
                <Box
                    element={
                        <>
                            <Summary watched={watched} />
                            <WatchedMovieList watched={watched} />
                        </>
                    }
                /> */}
                {/* this is the preffered way */}
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    <Summary watched={watched} />
                    <WatchedMovieList watched={watched} />
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

function Search() {
    const [query, setQuery] = useState("");
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

function MovieList({ movies }) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <MovieElement key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function MovieElement({ movie }) {
    return (
        <li>
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
/*
function WatchedBox() {
    
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <Summary watched={watched} />
                    <WatchedMovieList watched={watched} />
                </>
            )}
        </div>
    );
}
*/
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
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMovieList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovieElement key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function WatchedMovieElement({ movie }) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
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
            </div>
        </li>
    );
}