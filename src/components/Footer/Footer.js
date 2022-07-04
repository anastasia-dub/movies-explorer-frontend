import React from 'react';

import FooterList from '../FooterList/FooterList';

function Footer() {
  return (
    <footer
      className='footer'
    >
      <h2
        className='footer__title'
      >
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div
        className='footer__container'
      >
        <p
          className='footer__text'
        >
          © 2022
        </p>
        <FooterList />
      </div>
    </footer>
  );
}

export default Footer;
