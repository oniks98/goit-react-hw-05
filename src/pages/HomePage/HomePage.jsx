import MovieList from './../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = ({ movies }) => {
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
