import React from 'react';

import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';

import Preloader from '../Preloader/Preloader';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import useSearchMovies from '../../effects/useSearchMovies';

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
  loadingError,
}) {
  const [isSearchTouched, setIsSearchTouched] = React.useState(false);
  const isEmptyListError = isSearchTouched && savedMovies.length === 0;

  const {
    query,
    filterMovies,
    isLoading,
    isShowOnlyShortMovies,
    handleSearch,
    handleShortMoviesCheckboxClick,
  } = useSearchMovies({ movies: savedMovies, noFilterEmpty: true });

  const handleSubmit = (data) => {
    handleSearch(data);

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
          onDeleteSavedMovie={onDeleteSavedMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;
