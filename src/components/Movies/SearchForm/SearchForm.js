import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { msg } from '../../../constants/constants';
import './SearchForm.css'

export default function SearchForm({
  requestText, filterShort, isMakingRequest, findMovies, areSaved
}) {
  const [onlyShort, setOnlyShort] = React.useState(filterShort);
  const [inputContent, setInputContent] = React.useState(requestText);
  const [hintText, setHintText] = React.useState('');

  function beginSearch(filterShort) {
    if (isMakingRequest) return;
    if (!inputContent && !areSaved) {  // Пустой запрос запрещён только для исходных фильмов,
      setHintText(msg.ENTER_KEYWORD);  // а для сохраненных пустой запрос возвращает все.
    } else {
      findMovies(inputContent, filterShort);
    }
  }

  function handleFilterCheckboxChange() {
    setOnlyShort(!onlyShort);
    beginSearch(!onlyShort);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    beginSearch(onlyShort);
  }

  function handleInputChange(evt) {
    if (hintText) setHintText('');
    setInputContent(evt.target.value);
  }

  return (
    <form className="search-form" name="search-form" onSubmit={handleSubmit} noValidate={true}>
      <div className="search-form__search-bar">
        <input type="text" className="search-form__input" placeholder="Фильм"
          value={inputContent} onChange={handleInputChange}
        />
        <button type="submit" className="search-form__submit interactive-type-2"
          aria-label="Начать поиск" />
      </div>
      <span className="search-form__hint">{hintText}</span>
      <FilterCheckbox className="search-form__filter-checkbox"
        id="filter-checkbox" checked={onlyShort}
        onChange={handleFilterCheckboxChange}
      >
        Короткометражки
      </FilterCheckbox>
    </form>
  )
};
