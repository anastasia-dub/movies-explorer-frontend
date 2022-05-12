import React from 'react';

function PortfolioLinks({ items, portfolioTitle, styleSettings }) {
  const portfolioLinksItemsMarkup = items.map((item) => (
    <li
      key={item.id}
      className={styleSettings.portfolioItem}
    >
      <a
        className={styleSettings.portfolioLink}
        href={item.href}
        target='_blank' rel="noreferrer"
      >
        {item.text}
        {item.iconSpan && (
          <span
            className={styleSettings.portfolioLinkSpan}
          >
            {item.iconSpan}
          </span>
        )}

      </a>
    </li>
  ));

  return (
    <div
      className={styleSettings.portfolio}
    >
      {portfolioTitle && (
        <h5
          className={styleSettings.portfolioTitle}
        >
          {portfolioTitle}
        </h5>
      )}
      <ul
        className={styleSettings.portfolioList}
      >
        {portfolioLinksItemsMarkup}
      </ul>
    </div>

  );
}

export default PortfolioLinks;
