import { Link, Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  return (
    <main>
      <h1>About Us</h1>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
