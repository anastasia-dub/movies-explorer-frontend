import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import Title from '../Title/Title';

import ArticleAbout from '../ArticleAbout/ArticleAbout';

import Chart from '../Chart/Chart';

function AboutProject() {
  const ABOUT_PROJECT_ARTICLES_DATA = [
    {
      id: 1,
      title: 'Дипломный проект включал 5 этапов',
      text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    },
    {
      id: 2,
      title: 'На выполнение диплома ушло 5 недель',
      text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    },
  ];

  const TOTAL_UNITS_OF_TIME_SPENT = 5;

  const CHART_DATA = [
    {
      id: 1,
      numOfUnitsOfTimeSpent: 1,
      timeUnitText: 'неделя',
      subText: 'Back-end',
      bg: '#000',
      color: '#fff',
    },
    {
      id: 2,
      numOfUnitsOfTimeSpent: 4,
      timeUnitText: 'недели',
      subText: 'Front-end',
      bg: '#F2F2F2',
      color: '#000',
    },
  ];

  const articlesAboutMarkup = ABOUT_PROJECT_ARTICLES_DATA.map((item) => (
    <ArticleAbout
      key={item.id}
      title={item.title}
      text={item.text}
    />
  ));

  return (
    <MainArticle
      id='about-project'
      className='about-project-article'
    >
      <MainArticle.Header
        className='about-project-article__header'
      >
        <Title
          title='О проекте'
        />
      </MainArticle.Header>
      <MainArticle.ArticlesSection
        className='about-page-arcticle__items-section'
      >
        {articlesAboutMarkup}
      </MainArticle.ArticlesSection>
      <MainArticle.Section
        className='about-page-arcticle__section'
      >
        <Chart
          data={CHART_DATA}
          totalUnitsOfTimeSpent={TOTAL_UNITS_OF_TIME_SPENT}
        />
      </MainArticle.Section>
    </MainArticle>
  );
}

export default AboutProject;
