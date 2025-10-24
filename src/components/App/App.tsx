import { useState } from "react";
import { toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setHasError(false);
    setIsLoading(true);

    try {
      const moviesData = await fetchMovies({ query });

      if (moviesData.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(moviesData);
    } catch {
      setHasError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {hasError && <ErrorMessage />}

      {!isLoading && !hasError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}

      {!isLoading && !hasError && movies.length === 0 && (
        <div className={styles.placeholder}>
          <p>Enter a movie title to start searching</p>
        </div>
      )}

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
