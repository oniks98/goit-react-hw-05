import {
  useParams,
  Link,
  Outlet,
  NavLink,
  useLocation,
} from 'react-router-dom';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieDetailsPage = ({ trendingMovies, searchMovies, genres }) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state ?? '/movies';

  const movie =
    trendingMovies.find(movie => movie.id === Number(movieId)) ||
    searchMovies.find(movie => movie.id === Number(movieId));
  console.log(movie);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <Link to={backLink} className={css.link_button}>
          <button type="button" className={css.button}>
            Go back
          </button>
        </Link>
      </nav>

      <div className={css.block_dscr}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={css.moviePoster}
        />

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
    </div>
  );
};

export default MovieDetailsPage;
