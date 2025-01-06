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

// // src/components/MovieList.jsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const MovieList = ({ movies }) => {
//   const location = useLocation();

//   return (
//     <ul>
//       {movies.map(({ id, title, poster_path }) => (
//         <li key={id}>
//           <Link to={`/movies/${id}`} state={{ from: location }}>
//             <img
//               src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://example.com/default-image.jpg'}
//               alt={title}
//               width="150"
//             />
//             <p>{title}</p>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieList;

// // src/components/MovieCast.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchMovieCast } from '../services/tmdbApi';

// const MovieCast = () => {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState([]);

//   useEffect(() => {
//     fetchMovieCast(movieId).then(setCast).catch(console.error);
//   }, [movieId]);

//   return (
//     <ul>
//       {cast.map(({ id, name, profile_path }) => (
//         <li key={id}>
//           <img
//             src={profile_path ? `https://image.tmdb.org/t/p/w200/${profile_path}` : 'https://example.com/default-profile.jpg'}
//             alt={name}
//             width="100"
//           />
//           <p>{name}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieCast;

// // src/components/MovieReviews.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchMovieReviews } from '../services/tmdbApi';

// const MovieReviews = () => {
//   const { movieId } = useParams();
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetchMovieReviews(movieId).then(setReviews).catch(console.error);
//   }, [movieId]);

//   return (
//     <ul>
//       {reviews.length > 0 ? (
//         reviews.map(({ id, author, content }) => (
//           <li key={id}>
//             <p>
//               <strong>{author}:</strong>
//             </p>
//             <p>{content}</p>
//           </li>
//         ))
//       ) : (
//         <p>No reviews available for this movie.</p>
//       )}
//     </ul>
//   );
// };

// export default MovieReviews;

// // src/pages/HomePage.jsx
// import React, { useEffect, useState } from 'react';
// import { fetchTrendingMovies } from '../services/tmdbApi';
// import MovieList from '../components/MovieList';

// const HomePage = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchTrendingMovies().then(setMovies).catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h1>Trending Movies</h1>
//       <MovieList movies={movies} />
//     </div>
//   );
// };

// export default HomePage;

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

// // src/pages/MovieDetailsPage.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Outlet, useLocation, Link } from 'react-router-dom';
// import { fetchMovieDetails } from '../services/tmdbApi';

// const MovieDetailsPage = () => {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const location = useLocation();
//   const backLink = useRef(location.state?.from ?? '/movies');

//   useEffect(() => {
//     fetchMovieDetails(movieId).then(setMovie).catch(console.error);
//   }, [movieId]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div>
//       <Link to={backLink.current}>Go back</Link>
//       <h1>{movie.title}</h1>
//       <img
//         src={
//           movie.poster_path
//             ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//             : 'https://example.com/default-image.jpg'
//         }
//         alt={movie.title}
//         width="250"
//       />
//       <p>{movie.overview}</p>
//       <ul>
//         <li>
//           <Link to="cast">Cast</Link>
//         </li>
//         <li>
//           <Link to="reviews">Reviews</Link>
//         </li>
//       </ul>
//       <Outlet />
//     </div>
//   );
// };

// export default MovieDetailsPage;

// // src/pages/NotFoundPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFoundPage = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//       <Link to="/">Go back to Home</Link>
//     </div>
//   );
// };

// export default NotFoundPage;

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
