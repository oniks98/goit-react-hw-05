import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSearchMovies } from '../../movielist-api';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadMoreBtn from './../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from './../../components/Loader/Loader'; // Импортируем Loader
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovies(query, page);

        setSearchMovies(prevMovies =>
          page === 1 ? data.movies : [...prevMovies, ...data.movies]
        );

        setTotalPages(data.totalPages);

        if (page >= data.totalPages) {
          toast("We're sorry, but you've reached the end of search results.");
        }

        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 100); // Задержка для прокрутки после рендеринга
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <SearchBar setSearchParams={setSearchParams} />
      {isLoading && (
        <p className={css.loading}>
          <Loader />
        </p>
      )}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && query && searchMovies.length === 0 ? (
        <p className={css.subtitle}>No movies found for query: {query}</p>
      ) : (
        <>
          <MovieList movies={searchMovies} />
          {page < totalPages && (
            <>
              {isLoading ? (
                <Loader /> // Показываем Loader вместо кнопки
              ) : (
                <LoadMoreBtn onClick={handleLoadMore} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
