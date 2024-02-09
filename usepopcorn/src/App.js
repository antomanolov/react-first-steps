import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Loader from "./components/Loader";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage.js";
import SelectedMovie from "./components/SelectedMovie";
import Summary from "./components/Summary";
import WatchedMovieList from "./components/WatchedMovieList";

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
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
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
            return function () {
                controller.abort();
            };
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
