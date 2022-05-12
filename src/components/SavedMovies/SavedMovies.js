import React from 'react';

import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import MovieCardImage from '../../images/MoviesCard/movie-card-image.png';
import MovieCardImageTwo from '../../images/MoviesCard/movie-card-image2.png';

function SavedMovies() {
  const location = useLocation();

  const MOVIES_CARD_LIST_DATA = [
    {
      id: 1,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: false,
      isShortFilm: true,
    },
    {
      id: 2,
      title: '33 слова о дизайне»',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImageTwo,
      isMarked: false,
      isShortFilm: false,
    },
    {
      id: 5,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: false,
      isShortFilm: false,
    },
  ];

  return (
    <main>
      <SearchForm />
      <MoviesCardList
        data={MOVIES_CARD_LIST_DATA}
        locationPathname={location.pathname}
      />
    </main>
  );
}

export default SavedMovies;
