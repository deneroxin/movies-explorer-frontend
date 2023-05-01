import React from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox(
  { id, children, className, ...inputProps }
) {
  return (
    <label className={`filter-checkbox ${className}`} htmlFor={id}>
      <input type="checkbox" id={id}
        className="filter-checkbox__input"
        {...inputProps}
      />
      <span className="filter-checkbox__switch interactive-type-2" />
      <span className="filter-checkbox__label">{children}</span>
    </label>
  )
};
