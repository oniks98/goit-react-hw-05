import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast('Please enter a search query.');
      return;
    }

    // навігація на сторінку з результатами пошуку
    navigate(`/movies?query=${searchQuery}`);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
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
