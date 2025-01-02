import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../movielist-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams(); // Получаем movieId из URL
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  useEffect(() => {
    if (!movieId) return;

    const loadMovieReviews = async () => {
      setIsLoading(true); // Устанавливаем состояние загрузки
      try {
        const data = await fetchReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false); // Сбрасываем состояние загрузки
      }
    };

    loadMovieReviews();
  }, [movieId]);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!movieReviews.length) {
    return (
      <p className={css.message}>We do not have any reviews for this movie </p>
    );
  }

  return (
    <div className={css.container}>
      <h3 className={css.subtitle}>Reviews: </h3>
      <ul className={css.reviewsList}>
        {movieReviews.map(review => (
          <li key={review.id} className={css.reviewsItem}>
            <p className={css.author}>Author: {review.author}</p>
            <p className={css.reviewsText}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
