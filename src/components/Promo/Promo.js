import React from 'react';
import image from '../../images/Promo/promo__image.svg';

function Promo() {
  const handleClick = () => {
    document.querySelector('#about-project').scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="promo"
    >
      <div
        className="promo__container"
      >
        <div className="promo__content">
          <div className='promo__text'>
            <h1
              className="promo__title"
            >
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <h2
              className="promo__subtitle"
            >
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </h2>
          </div>
          <img className="promo__image" src={image} alt="картинка"/>
        </div>
        <button className='promo__button' onClick={handleClick}>Узнать больше</button>
      </div>

    </section>
  );
}

export default Promo;
