import React from 'react';

import { useLocation } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

import SearchForm from '../SearchForm/SearchForm';

import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import MovieCardImage from '../../images/MoviesCard/movie-card-image.png';
import MovieCardImageTwo from '../../images/MoviesCard/movie-card-image2.png';

function Movies() {
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(true);

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
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImageTwo,
      isMarked: false,
      isShortFilm: false,
    },
    {
      id: 3,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
      isShortFilm: true,
    },
    {
      id: 4,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImageTwo,
      isMarked: true,
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
    {
      id: 6,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImageTwo,
      isMarked: true,
      isShortFilm: false,
    },
    {
      id: 7,
      title: '33 слова о дизайне',
      subtitle: '1ч 42м',
      imageAlt: 'кадр из фильма',
      imageSrc: MovieCardImage,
      isMarked: true,
      isShortFilm: true,
    },
  ];

  React.useEffect(() => {
    const loadingDataTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingDataTimeout);
    };
  }, []);

  return (
    <main>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            data={MOVIES_CARD_LIST_DATA}
            locationPathname={location.pathname}
          />
          <ShowMoreButton
            onClick={() => console.log('Show more')}
          />
        </>
      )}
    </main>
  );
}

export default Movies;
