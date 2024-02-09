import MovieElement from "./MovieElement";

export default function MovieList({ movies, onSelectMOvie }) {
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
