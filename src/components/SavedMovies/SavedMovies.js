import React from 'react';

import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

const getError = (loadingError, isEmptyListError) => {
  if (loadingError) {
    return loadingError;
  }

  if (isEmptyListError) {
    return 'Ничего не найдено';
  }

  return null;
};

function SavedMovies({
  onDeleteSavedMovie,
  savedMovies,
  onSubmit,
  loadingError,
  onShortMoviesCheckboxClick,
}) {
  const [isSearchTouched, setIsSearchTouched] = React.useState(false);
  const isEmptyListError = isSearchTouched && savedMovies.length === 0;

  const handleSubmit = (data) => {
    onSubmit(data);

    if (!isSearchTouched) {
      setIsSearchTouched(true);
    }
  };

  const error = React.useMemo(() => {
    return getError(loadingError, isEmptyListError);
  }, [loadingError, isEmptyListError]);

  const location = useLocation();

  return (
    <main>
      <SearchForm
        onSubmit={handleSubmit}
        onShortMoviesCheckboxClick={onShortMoviesCheckboxClick}
      />
      {error && (
        <div
          className="movies-card-list-error"
        >
          {error}
        </div>
      )}
      {!error && (
        <MoviesCardList
          data={savedMovies}
          locationPathname={location.pathname}
          onDeleteSavedMovie={onDeleteSavedMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;
