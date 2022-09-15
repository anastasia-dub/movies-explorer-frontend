import React from 'react';

import InputField from '../InputField/InputField';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import SubmitButton from '../SubmitButton/SubmitButton';

import useFormWithValidation from '../../hooks/useFormValidation';

function SearchForm({
  query,
  onSubmit,
  onShortMoviesCheckboxClick,
  isShowOnlyShortMovies,
}) {
  const {
    values,
    handleChange,
  } = useFormWithValidation({ defaultValues: { search: query } });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  const SEARCH_TEXT_INPUT_SETTINGS = {
    type: 'text',
    id: 'search-text',
    ariaLabel: 'поиск фильма',
    placeholder: 'Фильм',
    name: 'search',
    maxLength: 30,
    required: false,
  };

  const SUBMIT_BUTTON_SETTINGS = {
    className: '',
    type: 'submit',
    title: 'Найти',
  };

  return (
    <>
      <form
        className='search-form'
        onSubmit={handleSubmit}
      >
        <InputField
          settings={SEARCH_TEXT_INPUT_SETTINGS}
          className='search-form__text-input'
          onChange={handleChange}
          value={values.search} />
        <SubmitButton
          className='search-form__submit-button'
          settings={SUBMIT_BUTTON_SETTINGS} />
      </form>
      <FilterCheckbox
        onClick={onShortMoviesCheckboxClick}
        checked={isShowOnlyShortMovies} />
    </>
  );
}

export default SearchForm;
