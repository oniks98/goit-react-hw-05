import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../movielist-api';
import MovieList from './../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className={css.container}>
      {isLoading && <p className={css.loading}>Loading...</p>}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && trendingMovies.length === 0 ? (
        <p className={css.subtitle}>No Trending movies</p>
      ) : (
        <>
          <h1 className={css.title}>Trending today</h1>
          <MovieList movies={trendingMovies} />
        </>
      )}
    </div>
  );
};

export default HomePage;
