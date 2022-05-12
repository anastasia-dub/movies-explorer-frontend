import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search-form">
      <div className='search-form__content'>
        <div className="search-form__search-input-wrapper">
          <input
            className="search-form__text-input"
            type="text"
            placeholder="Фильм"
            required
          />
        </div>
        <button className="search-form__button" type="submit">Найти</button>
      </div>
      <div className="search-form__shorts-wrapper">
        <p className="search-form__shorts-title">Короткометражки</p>
        <FilterCheckbox />
      </div>
    </div>
  );
}

export default SearchForm;
