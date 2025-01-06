import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ setSearchParams }) => {
  const handleSearch = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();

    if (!value) {
      toast.error('Please enter a search query.');
      return;
    }

    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          name="query"
          type="text"
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          <BsSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
