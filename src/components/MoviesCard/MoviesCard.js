import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import FavoritesButton from '../FavoritesButton/FavoritesButton';

function MoviesCard({
  data,
  locationPathname,
}) {
  const [isMarked, setIsMarked] = React.useState(data.isMarked);

  const handleMarkMovieCard = () => {
    setIsMarked(!isMarked);
  };

  return (
    <MainArticle
      id={data.id}
      className="movies-card-article"
    >
      <MainArticle.Section
        className="movies-card-article__image-section"
      >
        <img
          className="movies-card-article__image"
          alt={data.imageAlt}
          src={data.imageSrc}
        />
      </MainArticle.Section>
      <MainArticle.Header
        className="movies-card-article__header"
      >
        <div
          className="movies-card-article__container"
        >
          <h2
            className="movies-card-article__title"
          >
            {data.title}
          </h2>
          <FavoritesButton
          className="movies-card-article__favorite-button"
          onClick={handleMarkMovieCard}
          locationPathname={locationPathname}
          isMarked={isMarked}
          />
        </div>
        <div>
            <p
                className="movies-card-article__subtitle"
              >
                {data.subtitle}
            </p>
        </div>
      </MainArticle.Header>
    </MainArticle>

  );
}

export default MoviesCard;
