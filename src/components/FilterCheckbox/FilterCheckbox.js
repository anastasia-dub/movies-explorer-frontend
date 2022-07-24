import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onClick, checked }) {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input
          className="filter-checkbox__switcher"
          type="checkbox"
          onClick={onClick}
          defaultChecked={checked}
        />
        <p className="filter-checkbox__text">Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
