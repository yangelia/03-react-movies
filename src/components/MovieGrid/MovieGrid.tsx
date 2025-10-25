import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (movies.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={styles.card}
            onClick={() => onSelect(movie)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(movie)}
            tabIndex={0}
            role="button"
            aria-label={`Open movie details for ${movie.title}`}
          >
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={`Poster of ${movie.title}`}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
            {movie.release_date && (
              <div className={styles.year}>
                {new Date(movie.release_date).getFullYear()}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
