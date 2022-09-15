import { useCallback, useEffect, useState } from 'react';

const SHORT_MOVIE_DURATION = 40;
const QUERY_LOCALSTORAGE_KEY = 'movies_search_query';
const IS_SHOW_ONLY_SHORT_MOVIES_LOCALSTORAGE_KEY = 'only_short_movies';

const searchFilter = (data, searchQuery, params) => {
  let filteredData = data;

  if (params.isShowOnlyShortMovies) {
    filteredData = filteredData.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
  }

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'gi');
    return filteredData.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
  }
  return params && params.noFilterEmpty ? filteredData : [];
};

const getStoredValue = (key, defaultValue) => {
  const value = localStorage.getItem(key);

  if (typeof value !== 'undefined') {
    switch (value) {
      case '1':
        return true;
      case '0':
        return false;
      default:
        return value;
    }
  }

  return defaultValue;
};

const useSearchMovies = ({ movies, sholdUseStorage, noFilterEmpty }) => {
  const [filterMovies, setFilterMovies] = useState([]);
  const [query, setQuery] = useState(() => {
    if (sholdUseStorage) {
      return getStoredValue(QUERY_LOCALSTORAGE_KEY, '');
    }
    return '';
  });
  const [isShowOnlyShortMovies, setIsShowOnlyShortMovies] = useState(() => {
    if (sholdUseStorage) {
      return getStoredValue(IS_SHOW_ONLY_SHORT_MOVIES_LOCALSTORAGE_KEY, false);
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchEmptyError, setIsSearchEmptyError] = useState(false);

  useEffect(() => {
    const filterData = searchFilter(movies, query, { noFilterEmpty, isShowOnlyShortMovies });
    setFilterMovies(filterData);
    if (sholdUseStorage) {
      localStorage.setItem(QUERY_LOCALSTORAGE_KEY, query);
      localStorage.setItem(
        IS_SHOW_ONLY_SHORT_MOVIES_LOCALSTORAGE_KEY,
        isShowOnlyShortMovies ? 1 : 0,
      );
    }
  }, [movies, query, isShowOnlyShortMovies]);

  const handleSearch = ({ search }) => {
    if (typeof search === 'undefined' || search.length === 0) {
      setIsSearchEmptyError(true);
      return;
    }

    setIsSearchEmptyError(false);

    setIsLoading(true);
    setTimeout(() => {
      setQuery(search);
      setIsLoading(false);
    }, 600);
  };

  const handleShortMoviesCheckboxClick = useCallback(e => {
    setIsShowOnlyShortMovies(e.target.checked);
  }, [setIsShowOnlyShortMovies]);

  return {
    query,
    filterMovies,
    isLoading,
    isSearchEmptyError,
    isShowOnlyShortMovies,
    handleSearch,
    handleShortMoviesCheckboxClick,
  };
};

export default useSearchMovies;
