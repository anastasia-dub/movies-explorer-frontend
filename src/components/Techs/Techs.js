import React from 'react';

import MainArticle from '../MainArticle/MainArticle';

import ArticleTech from '../ArticleTech/ArticleTech';

import Title from '../Title/Title';

import TechsList from '../TechsList/TechsList';

function Techs() {
  const TECHS_ARTICLES_DATA = [
    {
      id: 1,
      title: '7 технологий',
      text: 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
    },
  ];

  const articlesMarkup = TECHS_ARTICLES_DATA.map((item) => (
    <ArticleTech
      key={item.id}
      title={item.title}
      text={item.text}
    />
  ));

  return (
    <div className='techs'>
      <MainArticle
      id='technologies'
      className='techs-article'
      >
      <MainArticle.Header
        className='techs-article__header'
      >
        <Title
          title='Технологии'
        />
      </MainArticle.Header>
      <MainArticle.ArticlesSection
        className='techs-article__items-section'
      >
        {articlesMarkup}
      </MainArticle.ArticlesSection>
      <MainArticle.Section
        className='techs-article__section'
      >
        <TechsList />
      </MainArticle.Section>
      </MainArticle>
    </div>
  );
}

export default Techs;
