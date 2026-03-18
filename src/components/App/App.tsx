import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal'; 
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]); 
      
      const data = await fetchMovies(query);
      
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      
      {isError && <ErrorMessage />}
      
      {isLoading && <Loader />}
      
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {!isLoading && movies.length === 0 && !isError && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Please enter a search term to find movies.
        </p>
      )}

      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}