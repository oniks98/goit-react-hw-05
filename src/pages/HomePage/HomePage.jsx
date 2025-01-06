import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../movielist-api';
import MovieList from './../../components/MovieList/MovieList';
import LoadMoreBtn from './../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from './../../components/Loader/Loader'; // Импортируем Loader
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTrendingMovies(page);

        setTrendingMovies(prevMovies =>
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

    loadMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.container}>
      {error && <p className={css.error}>{error}</p>}

      {!isLoading && trendingMovies.length === 0 ? (
        <p className={css.subtitle}>No Trending movies</p>
      ) : (
        <>
          <h2 className={css.title}>Trending today</h2>
          <MovieList movies={trendingMovies} />
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

export default HomePage;
