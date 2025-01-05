import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../movielist-api';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css';

const MoviesPage = ({ searchMovies, setSearchMovies }) => {
  const [searchParams] = useSearchParams();
  // const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const query = searchParams.get('query'); // Получаем параметр запроса

  useEffect(() => {
    if (!query) return; // Если параметра нет, ничего не делаем

    const searchMovies = async () => {
      setIsLoading(true); // Устанавливаем состояние загрузки
      try {
        const data = await fetchSearchMovies(query);
        setSearchMovies(data); // Оновлюємо стан у App
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      } finally {
        setIsLoading(false); // Сбрасываем состояние загрузки
      }
    };

    searchMovies();
  }, [query, setSearchMovies]);

  return (
    <div className={css.container}>
      <SearchBar />
      {isLoading && <p className={css.loading}>Loading...</p>}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && query && searchMovies.length === 0 ? (
        <p className={css.subtitle}>No movies found for query: {query}</p>
      ) : (
        <MovieList movies={searchMovies} />
      )}
    </div>
  );
};

export default MoviesPage;
