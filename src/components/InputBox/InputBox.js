import React from 'react';
import { FormDataContext } from '../../contexts/contexts';
import './InputBox.css';

export default function InputBox({ label, ...inputProps}) {
  const { id, name } = inputProps;
  const { inputsContent, errorText, showError, ...moreInputProps } = React.useContext(FormDataContext);
  return (
    <div className="input-box">
      <label className="input-box__label" htmlFor={id}>
        {label}
      </label>
      <input className={`input-box__input${showError[name] && errorText[name] ? ' error' : ''}`}
        value={inputsContent[name]}
        {...moreInputProps}
        {...inputProps}
      />
      <span className="input-box__error">
        {showError[name] && errorText[name]}
      </span>
    </div>
  );
}
