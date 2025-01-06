import { Link, useLocation } from 'react-router-dom';
import shortid from 'shortid'; // Импортируем библиотеку shortid
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => {
        const uniqueKey = shortid.generate(); // Генерируем короткий уникальный ключ
        console.log('Movie ID:', id); // Для отладки выводим ID в консоль

        return (
          <li key={uniqueKey} className={css.movieItem}>
            <h3 className={css.subtitle}>
              <Link
                to={`/movies/${id}`}
                state={{ from: location }}
                className={css.movieLink}
              >
                <p>{title}</p>
              </Link>
            </h3>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
