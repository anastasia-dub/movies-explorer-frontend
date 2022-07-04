import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import FavoritesButton from '../FavoritesButton/FavoritesButton';

import convertTime from '../../utils/convertTime';

import getFullImageUrl from '../../utils/getFullImageUrl';

import getTrailerUrl from '../../utils/getTrailerUrl';

function MoviesCard({
  data,
  locationPathname,
  onSaveMovie,
  onDeleteSavedMovie,
}) {
  const [movieData] = React.useState({
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getFullImageUrl(data),
    trailerLink: getTrailerUrl(data),
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.id,
    thumbnail: getFullImageUrl(data),
  });

  const handleClickFavoriteButton = () => {
    if (locationPathname === '/movies') {
      if (!data.saved) {
        onSaveMovie(movieData);
      } else {
        onDeleteSavedMovie(movieData);
      }
    } else if (locationPathname === '/saved-movies') {
      onDeleteSavedMovie(movieData);
    }
  };

  return (
    <MainArticle
      id={data._id || movieData.movieId}
      className='movies-card-article'
    >
      <MainArticle.Section
        className='movies-card-article__image-section'
      >
        <a
          href={movieData.trailerLink}
          target='_blank'
          aria-label={`Открыть трейлер фильма "${movieData.nameRU}" на youtube.com`} rel="noreferrer"

        >
          <img
            className='movies-card-article__image'
            alt={movieData.nameRU || movieData.nameEN}
            src={movieData.image}
          />
        </a>
      </MainArticle.Section>
      <MainArticle.Header
        className='movies-card-article__header'
      >
        <div
          className='movies-card-article__text-container'
        >
          <h2
            className='movies-card-article__title'
          >
            {movieData.nameRU || movieData.nameEN}
          </h2>
          <FavoritesButton
          className='movies-card-article__favorite-button'
          onClick={handleClickFavoriteButton}
          locationPathname={locationPathname}
          isSaved={data.saved}
          />
        </div>
        <div className='movies-card-article__time'>
          <p
              className='movies-card-article__subtitle'
          >
              {convertTime(movieData.duration)}
          </p>
        </div>
      </MainArticle.Header>
    </MainArticle>
  );
}

export default MoviesCard;
