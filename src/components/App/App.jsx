import { Routes, Route } from 'react-router-dom';
import HomePage from './../../pages/HomePage/HomePage';
import MoviesPage from './../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './../../pages/NotFoundPage/NotFoundPage';
import MovieCast from './../MovieCast/MovieCast';
import MovieReviews from './../MovieReviews/MovieReviews';
import AppBar from './../AppBar/AppBar';
// import fetchMovie from '../../movielist-api.js';
import css from './App.module.css';

const App = () => {
  // const loadImages = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     const data = await fetchImages(query, perPage, page);
  //   } catch (error) {
  //     setError(`Unable to load images: ${error.message}`);
  //   }

  //   loadImages();
  // };

  return (
    <div className={css.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
