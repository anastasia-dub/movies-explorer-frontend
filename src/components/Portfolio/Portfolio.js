import React from 'react';

import PortfolioLinks from '../PortfolioLinks/PortfolioLinks';

function Portfolio() {
  const PORTFOLIO_TITLE = 'Портфолио';

  const PORTFOLIO_ITEMS = [
    {
      id: 1,
      text: 'Статичный сайт',
      href: 'https://github.com/anastasia-dub/how-to-learn',
      iconSpan: '↗',
    },
    {
      id: 2,
      text: 'Адаптивный сайт',
      href: 'https://github.com/anastasia-dub/russian-travel',
      iconSpan: '↗',
    },
    {
      id: 3,
      text: 'Одностраничное приложение',
      href: 'https://github.com/anastasia-dub/react-mesto-api-full',
      iconSpan: '↗',
    },
  ];

  const PORTFOLIO_STYLE_SETTINGS = {
    portfolio: 'portfolio',
    portfolioList: 'portfolio__list',
    portfolioTitle: 'portfolio__title',
    portfolioItem: 'portfolio__item',
    portfolioLink: 'portfolio__link',
    portfolioLinkSpan: 'portfolio__link-span',
  };

  return (
    <PortfolioLinks
      items={PORTFOLIO_ITEMS}
      portfolioTitle={PORTFOLIO_TITLE}
      styleSettings={PORTFOLIO_STYLE_SETTINGS}
    />
  );
}

export default Portfolio;
