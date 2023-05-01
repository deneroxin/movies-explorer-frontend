import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { GlobalHandlersContext } from '../../../contexts/contexts';
import './SearchForm.css'

export default function SearchForm() {
  const { startSearching } = React.useContext(GlobalHandlersContext);

  const [onlyShort, setOnlyShort] = React.useState(false);
  const [inputContent, setInputContent] = React.useState('');

  function handleFilterCheckboxChange() {
    setOnlyShort((oldState) => !oldState);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    startSearching(inputContent);
  }

  function handleInputChange(evt) {
    setInputContent(evt.target.value);
  }

  return (
    <form className="search-form" name="search-form" onSubmit={handleSubmit} noValidate={true}>
      <div className="search-form__search-bar">
        <input type="text" className="search-form__input" placeholder="Фильм"
          value={inputContent} onChange={handleInputChange}
        />
        <button type="submit"
          className={`search-form__submit${inputContent ? ' interactive-type-2' : ''}`}
          aria-label="Начать поиск" disabled={!inputContent} />
      </div>
      <FilterCheckbox className="search-form__filter-checkbox"
        id="filter-checkbox" checked={onlyShort}
        onChange={handleFilterCheckboxChange}
      >
        Короткометражки
      </FilterCheckbox>
    </form>
  )
};
