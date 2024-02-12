import { useState } from "react";
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
import { useMovies } from "./components/useMovies.js";
import { useLocalStorageState } from "./components/useLocalStorageState.js";

// const KEY = "dfd43ff9";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");

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
