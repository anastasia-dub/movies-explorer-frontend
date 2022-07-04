import React from 'react';

import { useLocation } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import SearchForm from '../SearchForm/SearchForm';

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
  isLoading,
  moviesData,
  onSubmit,
  onSaveMovie,
  onDeleteSavedMovie,
  loadingError,
  isSearchEmptyError,
  onShortMoviesCheckboxClick,
}) {
  const location = useLocation();

  const [isSearchTouched, setIsSearchTouched] = React.useState(false);
  const isEmptyListError = isSearchTouched && moviesData.length === 0;
  const error = React.useMemo(() => {
    return getError(loadingError, isSearchEmptyError, isEmptyListError);
  }, [loadingError, isSearchEmptyError, isEmptyListError]);

  const handleSubmit = (data) => {
    onSubmit(data);

    if (!isSearchTouched) {
      setIsSearchTouched(true);
    }
  };

  return (
    <main>
      <SearchForm
        onSubmit={handleSubmit}
        onShortMoviesCheckboxClick={onShortMoviesCheckboxClick}
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
          data={moviesData}
          locationPathname={location.pathname}
          onSaveMovie={onSaveMovie}
          onDeleteSavedMovie={onDeleteSavedMovie}
        />
      )}
    </main>
  );
}

export default Movies;
