import { Link, useLocation } from 'react-router-dom'; // Link для навігації, useLocation для збереження попереднього маршруту
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримуємо інформацію про поточне місце розташування

  return (
    <ul className={css.movieList}>
      {/* Генеруємо список фільмів */}
      {movies.map(({ id, title }) => (
        <li key={id} className={css.movieItem}>
          <h3 className={css.subtitle}>
            <Link
              to={`/movies/${id}`} // Формуємо шлях до сторінки з деталями фільму
              state={{ from: location }} // Зберігаємо інформацію про поточний маршрут
              className={css.movieLink}
            >
              {title}
            </Link>
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
