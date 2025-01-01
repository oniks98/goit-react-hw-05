import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchGenresMovies } from '../../movielist-api';
import HomePage from './../../pages/HomePage/HomePage';
import MoviesPage from './../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './../../pages/NotFoundPage/NotFoundPage';
import MovieCast from './../MovieCast/MovieCast';
import MovieReviews from './../MovieReviews/MovieReviews';
import AppBar from './../AppBar/AppBar';
import css from './App.module.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  // const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(null);

  // Загружаем фильмы и жанры
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      }
    };

    loadMovies();
  }, []);

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
      <AppBar />
      {error && <p className={css.error}>{error}</p>}
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetailsPage movies={movies} genres={genres} />}
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
