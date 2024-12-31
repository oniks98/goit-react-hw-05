import { Routes, Route } from 'react-router-dom';
import HomePage from './../../pages/HomePage/HomePage';
import MoviesPage from './../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './../../pages/NotFoundPage/NotFoundPage';
import MovieCast from './../MovieCast/MovieCast';
import MovieReviews from './../MovieReviews/MovieReviews';
import AppBar from './../AppBar/AppBar';
import fetchTrendingMovies from '../../movielist-api';
import { useState, useEffect } from 'react';
import css from './App.module.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className={css.container}>
      <AppBar />
      {error && <p className={css.error}>{error}</p>}
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetailsPage movies={movies} />}
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
