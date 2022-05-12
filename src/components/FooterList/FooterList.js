import React from 'react';

const FOOTER_LINKS = [
  {
    text: 'Яндекс.Практикум',
    href: 'https://praktikum.yandex.ru/',
  },
  {
    text: 'Github',
    href: 'https://github.com/anastasia-dub',
  },
  {
    text: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100012944139616',
  },
];

function FooterList() {
  return (
    <ul className='footer-list__list'>
      {FOOTER_LINKS.map((link) => (
        <li
        key={link.text}
        className='footer-list__item'
        >
          <a
          href={link.href}
          target='_blank'
          rel='noreferrer'
          className='footer-list__link'
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default FooterList;
