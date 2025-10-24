import axios from "axios";
import type { Movie } from "../types/movie";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axiosInstance.get<TMDBResponse>("/search/movie", {
      params: {
        query: query.trim(),
        include_adult: false,
        language: "en-US",
        page,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid API token");
      }
      if (error.response?.status === 404) {
        throw new Error("Movies not found");
      }
    }

    throw new Error("Failed to fetch movies");
  }
}
