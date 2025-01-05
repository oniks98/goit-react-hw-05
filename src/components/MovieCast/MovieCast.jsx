import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../movielist-api';
import css from './MovieCast.module.css';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieCast = () => {
  const { movieId } = useParams(); // Получаем movieId из URL
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  useEffect(() => {
    if (!movieId) return;

    const loadMovieCast = async () => {
      setIsLoading(true); // Устанавливаем состояние загрузки
      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false); // Сбрасываем состояние загрузки
      }
    };

    loadMovieCast();
  }, [movieId]);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!movieCast.length) {
    return <p className={css.message}>No cast information available.</p>;
  }

  return (
    <div className={css.container}>
      <h3 className={css.subtitle}>Movie Cast</h3>
      <ul className={css.castList}>
        {movieCast.map(actor => (
          <li key={actor.cast_id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.characterName}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
