import WatchedMovieElement from "./WatchedMovieElement";

export default function WatchedMovieList({ watched, onDelete }) {
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
