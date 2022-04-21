import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import ArticleAboutMe from '../ArticleAboutMe/ArticleAboutMe';

import Title from '../Title/Title';

import Portfolio from '../Portfolio/Portfolio';

import AboutMePortrait from '../../images/AboutMe/about-me-portrait.jpg';

function AboutMe() {
  const ABOUT_ME_TITLE = 'Студентка';

  const ABOUT_ME_ARTICLES_DATA = [
    {
      id: 1,
      title: 'Анастасия',
      subTitle: 'Фронтенд-разработчик, 23 года',
      text: 'Я живу в Калининграде. Люблю рисование, активный образ жизни, путешествия. За несколько последних месяцев объездила все интересные и красивые места Калининградской области. Мне очень нравится исследовать этот мир и обучаться всему новому. Сейчас моя главная цель - это продолжить развиваться в IT сфере и войти в число лучших IT-специалистов.',
      linksTitle: 'Портфолио',
      links: [
        {
          id: 1,
          title: 'Facebook',
          link: 'https://www.facebook.com/profile.php?id=100012944139616',
        },
        {
          id: 2,
          title: 'Github',
          link: 'https://github.com/anastasia-dub',
        },
      ],
      images: [
        {
          id: 1,
          src: AboutMePortrait,
          alt: 'Портрет студентки Анастасии',
        },
      ],
    },
  ];

  const ABOUT_ME_ARTICLE_STYLES = {
    article: 'about-me-article',
    articleHeader: 'about-me-article__header',
    articleItemsSection: 'about-me-article__items-section',
    articleSection: 'about-me-article__section',
  };

  const ABOUT_ME_ARTICLE_ID = 'student';

  const articlesMeMarkup = ABOUT_ME_ARTICLES_DATA.map((item) => (
    <ArticleAboutMe
      key={item.id}
      title={item.title}
      subTitle={item.subTitle}
      text={item.text}
      linksTitle={item.linksTitle}
      links={item.links}
      images={item.images}
    />
  ));

  return (
    <MainArticle
      id={ABOUT_ME_ARTICLE_ID}
      className={ABOUT_ME_ARTICLE_STYLES.article}
    >
      <MainArticle.Header
        className={ABOUT_ME_ARTICLE_STYLES.articleHeader}
      >
        <Title
          title={ABOUT_ME_TITLE}
        />
      </MainArticle.Header>
      <MainArticle.ArticlesSection
        className={ABOUT_ME_ARTICLE_STYLES.articleItemsSection}
      >
        {articlesMeMarkup}
      </MainArticle.ArticlesSection>
      <MainArticle.Section
        className={ABOUT_ME_ARTICLE_STYLES.articleSection}
      >
        <Portfolio />
      </MainArticle.Section>
    </MainArticle>
  );
}

export default AboutMe;
