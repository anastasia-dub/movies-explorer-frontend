import React from 'react';

import { useLocation } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import SearchForm from '../SearchForm/SearchForm';
import useSearchMovies from '../../effects/useSearchMovies';

const getError = (loadingError, isSearchEmptyError, isEmptyListError) => {
  if (loadingError) {
    return loadingError;
  }

  if (isSearchEmptyError) {
    return 'Нужно ввести ключевое слово';
  }

  if (isEmptyListError) {
    return 'Ничего не найдено';
  }

  return null;
};

function Movies({
  moviesData,
  onSaveMovie,
  onDeleteSavedMovie,
  loadingError,
}) {
  const location = useLocation();
  const {
    query,
    filterMovies,
    isLoading,
    isSearchEmptyError,
    isShowOnlyShortMovies,
    handleSearch,
    handleShortMoviesCheckboxClick,
  } = useSearchMovies({ movies: moviesData, sholdUseStorage: true });

  const [isSearchTouched, setIsSearchTouched] = React.useState(false);
  const isEmptyListError = isSearchTouched && moviesData.length === 0;
  const error = React.useMemo(() => {
    return getError(loadingError, isSearchEmptyError, isEmptyListError);
  }, [loadingError, isSearchEmptyError, isEmptyListError]);

  const handleSubmit = (data) => {
    handleSearch(data);

    if (!isSearchTouched) {
      setIsSearchTouched(true);
    }
  };

  return (
    <main>
      <SearchForm
        query={query}
        onSubmit={handleSubmit}
        onShortMoviesCheckboxClick={handleShortMoviesCheckboxClick}
        isShowOnlyShortMovies={isShowOnlyShortMovies}
      />
      {isLoading && (
        <Preloader />
      )}
      {error && (
        <div
          className="movies-card-list-error"
        >
          {error}
        </div>
      )}
      {!error && (
        <MoviesCardList
          data={filterMovies}
          locationPathname={location.pathname}
          onSaveMovie={onSaveMovie}
          onDeleteSavedMovie={onDeleteSavedMovie}
        />
      )}
    </main>
  );
}

export default Movies;
