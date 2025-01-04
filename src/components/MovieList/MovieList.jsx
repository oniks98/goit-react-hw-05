import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, basePath = '/movies' }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <h3 className={css.subtitle}>
            <Link to={`${basePath}/${movie.id}`} className={css.movieLink}>
              {movie.title}
            </Link>
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
