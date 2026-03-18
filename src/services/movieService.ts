import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

export const fetchMovies = async (query: string): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data;
};