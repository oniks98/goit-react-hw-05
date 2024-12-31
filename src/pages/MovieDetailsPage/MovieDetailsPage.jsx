import { useParams, Link, Outlet } from 'react-router-dom';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find(movie => movie.id === Number(movieId));

  if (!movie) return;

  return (
    <div>
      <nav className={css.nav}>
        <Link to="/" className={css.link}>
          <button type="button" className={css.button}>
            Go back
          </button>
        </Link>
      </nav>

      <div className={css.block_dscr}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={css.moviePoster}
          />
        )}
        <div className={css.dscr}>
          <h2>
            {movie.title}({movie.release_date})
          </h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genre_ids}</p>
        </div>
      </div>

      <h3>Additional information</h3>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
