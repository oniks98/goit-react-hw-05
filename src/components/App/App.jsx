import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchGenresMovies } from '../../movielist-api';
import HomePage from './../../pages/HomePage/HomePage';
import MoviesPage from './../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './../../pages/NotFoundPage/NotFoundPage';
import MovieCast from './../MovieCast/MovieCast';
import MovieReviews from './../MovieReviews/MovieReviews';
import Navigation from './../Navigation/Navigation';
import css from './App.module.css';

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  // Фільми у тренді
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      }
    };

    loadMovies();
  }, []);

  // Жанри фільмів
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenresMovies();
        setGenres(data);
      } catch (error) {
        setError(`Error fetching genres: ${error.message}`);
      }
    };

    loadGenres();
  }, []);

  return (
    <div className={css.container}>
      <Navigation />
      {error && <p className={css.error}>{error}</p>}
      <Routes>
        <Route path="/" element={<HomePage movies={trendingMovies} />} />
        <Route
          path="/movies"
          element={
            <MoviesPage
              setSearchMovies={setSearchMovies}
              searchMovies={searchMovies}
            />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieDetailsPage
              trendingMovies={trendingMovies}
              searchMovies={searchMovies}
              genres={genres}
            />
          }
        >
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
