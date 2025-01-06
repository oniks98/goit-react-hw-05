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
      <Suspense fallback={<div className={css.loading}>Loading page...</div>}>
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

// // src/pages/MoviesPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { searchMovies } from '../services/tmdbApi';
// import MovieList from '../components/MovieList';

// const MoviesPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('query') || '';

//   useEffect(() => {
//     if (!query) return;
//     searchMovies(query).then(setMovies).catch(console.error);
//   }, [query]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const value = e.target.elements.query.value;
//     if (value.trim()) {
//       setSearchParams({ query: value });
//     }
//   };

//   return (
//     <div>
//       <h1>Search Movies</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="query" defaultValue={query} />
//         <button type="submit">Search</button>
//       </form>
//       <MovieList movies={movies} />
//     </div>
//   );
// };

// export default MoviesPage;

// import { Routes, Route, NavLink } from 'react-router-dom';
// import React, { lazy, Suspense } from 'react';

// const HomePage = lazy(() => import('./pages/HomePage'));
// const MoviesPage = lazy(() => import('./pages/MoviesPage'));
// const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
// const MovieCast = lazy(() => import('./components/MovieCast'));
// const MovieReviews = lazy(() => import('./components/MovieReviews'));

// const App = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <nav>
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/movies">Movies</NavLink>
//       </nav>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/movies" element={<MoviesPage />} />
//         <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
//           <Route path="cast" element={<MovieCast />} />
//           <Route path="reviews" element={<MovieReviews />} />
//         </Route>
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default App;

// import axios from 'axios';

// const API_KEY = 'YOUR_API_KEY_HERE';
// const BASE_URL = 'https://api.themoviedb.org/3';

// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

// export const fetchTrendingMovies = async () => {
//   const { data } = await instance.get('/trending/movie/day');
//   return data.results;
// };

// export const searchMovies = async query => {
//   const { data } = await instance.get('/search/movie', {
//     params: { query, include_adult: false, language: 'en-US', page: 1 },
//   });
//   return data.results;
// };

// export const fetchMovieDetails = async movieId => {
//   const { data } = await instance.get(`/movie/${movieId}`);
//   return data;
// };

// export const fetchMovieCast = async movieId => {
//   const { data } = await instance.get(`/movie/${movieId}/credits`);
//   return data.cast;
// };

// export const fetchMovieReviews = async movieId => {
//   const { data } = await instance.get(`/movie/${movieId}/reviews`);
//   return data.results;
// };
