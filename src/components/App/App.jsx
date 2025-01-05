import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../movielist-api';
import NotFoundPage from './../../pages/NotFoundPage/NotFoundPage';
import Navigation from './../Navigation/Navigation';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';

const HomePage = lazy(() => import('./../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./../MovieReviews/MovieReviews'));

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
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

  return (
    <div className={css.container}>
      <Navigation />
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />
      {error && <p className={css.error}>{error}</p>}
      <Suspense fallback={<div>Loading page...</div>}>
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
              />
            }
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
