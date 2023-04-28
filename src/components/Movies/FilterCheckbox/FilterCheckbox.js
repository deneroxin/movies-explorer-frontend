import React from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox(
  { id, name, value, checked, onChange, children, className }) {
  return (
    <label className={`filter-checkbox ${className}`} htmlFor={id}>
      <input type="checkbox"
        className="filter-checkbox__input"
        {...{id, name, value, checked, onChange}}
      />
      <span className="filter-checkbox__switch interactive_type_2" />
      <span className="filter-checkbox__label">{children}</span>
    </label>
  )
};
