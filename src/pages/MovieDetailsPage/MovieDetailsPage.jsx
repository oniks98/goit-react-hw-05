import { useParams, Link, Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ movies, genres }) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const { movieId } = useParams();
  const movie = movies.find(movie => movie.id === Number(movieId));

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <Link to="/" className={css.link_button}>
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
            {movie.title} ({movie.release_date})
          </h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>
            {movie.genre_ids
              .map(genreId => {
                const genre = genres.find(genre => genre.id === genreId);
                return genre ? genre.name : null;
              })
              .join(', ')}
          </p>
        </div>
      </div>
      <h3>Additional information</h3>

      <ul className={css.list}>
        <li>
          <nav className={css.nav}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </nav>
        </li>
        <li>
          <nav className={css.nav}>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </nav>
        </li>
      </ul>
      <Outlet />
      {/* <nav className={css.nav}>
        <Link to="/" className={css.link_button}>
          <button type="button" className={css.button}>
            Go back
          </button>
        </Link>
      </nav> */}
    </div>
  );
};

export default MovieDetailsPage;
