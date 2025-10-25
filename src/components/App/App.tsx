import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";
import { movieSearch } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (submitValue: string) => {
    setMovies([]);
    setErrorMessage(false);
    setLoading(true);

    try {
      const newMovies = await movieSearch({
        query: submitValue,
      });

      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(newMovies);
    } catch (err) {
      console.error(err);
      setErrorMessage(true);
      toast.error("Error fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <SearchBar onSubmit={handleSubmit} />

        {loading && <Loader />}

        {errorMessage ? (
          <ErrorMessage />
        ) : (
          <MovieGrid onSelect={handleSelect} movies={movies} />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default App;
