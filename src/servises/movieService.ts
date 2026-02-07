import axios from "axios";
import type { Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMovies {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!TMDB_TOKEN) {
    throw new Error("TMDB token is missing: VITE_TMDB_TOKEN is undefined");
  }

  const { data } = await axios.get<FetchMovies>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );

  return data.results;
}
