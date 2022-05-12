import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import ArticleAboutMe from '../ArticleAboutMe/ArticleAboutMe';

import Title from '../Title/Title';

import Portfolio from '../Portfolio/Portfolio';

import AboutMePortrait from '../../images/AboutMe/about-me-portrait.jpg';

function AboutMe() {
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
      id='student'
      className='about-me-article'
    >
      <MainArticle.Header
        className='about-me-article__header'
      >
        <Title
          title='Студентка'
        />
      </MainArticle.Header>
      <MainArticle.ArticlesSection
        className='about-me-article__items-section'
      >
        {articlesMeMarkup}
      </MainArticle.ArticlesSection>
      <MainArticle.Section
        className='about-me-article__section'
      >
        <Portfolio />
      </MainArticle.Section>
    </MainArticle>
  );
}

export default AboutMe;
