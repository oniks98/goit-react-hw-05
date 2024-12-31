import MovieList from './../../components/MovieList/MovieList';

const HomePage = ({ movies }) => {
  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
