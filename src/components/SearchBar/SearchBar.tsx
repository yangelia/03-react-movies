import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (submitValue: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const inputValue = (formData.get("query") as string).trim();

    if (!inputValue) {
      toast.error("Please enter your search query.");
      return;
    }

    if (inputValue.length < 2) {
      toast.error("Search query must be at least 2 characters long.");
      return;
    }

    onSubmit(inputValue);
  };

  return (
    <header className={styles.header}>
      <Toaster position="top-center" />
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
