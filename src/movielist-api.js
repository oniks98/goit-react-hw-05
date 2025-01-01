import axios from 'axios';

export const fetchTrendingMovies = async () => {
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZmZDhiNGNmYTQ1NjZhYjYwNDE3NThkNzE2ZGUyNiIsIm5iZiI6MTczNTQ4OTAzMS4yMTI5OTk4LCJzdWIiOiI2NzcxNzYwN2I3MDAxM2NjMGY2MTRjNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bmuIIO7f1539c88E4Q_8__R4K372k1m05wpkAgMTqw`,
    },
    params: {
      language: 'en-US',
    },
  });
  return response.data.results;
};

export const fetchGenresMovies = async () => {
  const API_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZmZDhiNGNmYTQ1NjZhYjYwNDE3NThkNzE2ZGUyNiIsIm5iZiI6MTczNTQ4OTAzMS4yMTI5OTk4LCJzdWIiOiI2NzcxNzYwN2I3MDAxM2NjMGY2MTRjNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bmuIIO7f1539c88E4Q_8__R4K372k1m05wpkAgMTqw`,
    },
    params: {
      language: 'en-US',
    },
  });
  return response.data.genres;
};

export const fetchMovieCast = async movieId => {
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZmZDhiNGNmYTQ1NjZhYjYwNDE3NThkNzE2ZGUyNiIsIm5iZiI6MTczNTQ4OTAzMS4yMTI5OTk4LCJzdWIiOiI2NzcxNzYwN2I3MDAxM2NjMGY2MTRjNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bmuIIO7f1539c88E4Q_8__R4K372k1m05wpkAgMTqw`,
    },
    params: {
      language: 'en-US',
    },
  });

  return response.data.cast;
};
