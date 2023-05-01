import React from 'react';
import { Link } from 'react-router-dom';
import { useValidation } from '../../utils/customHooks';
import { FormDataContext } from '../../contexts/contexts';
import './SignPane.css';

export default function SignPane({
  className, title, submitText, prompt, linkText, linkPath,
  children, validationObject, onSubmit
}) {
  const [formData, isFormInvalid] = useValidation(validationObject);
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }
  return (
    <div className={`sign-pane ${className}`}>
      <Link className="sign-pane__logo site-logo interactive-type-2" to="/" />
      <h1 className="sign-pane__title">{title}</h1>
      <form name="sign-pane" noValidate={true} className="sign-pane__form" onSubmit={handleSubmit}>
        <FormDataContext.Provider value={formData}>
          {children}
        </FormDataContext.Provider>
        <button type="submit"
          className={`sign-pane__submit interactive-type-2${children.length < 3 ? ' extra-space' : ''}`}
          disabled={isFormInvalid}
        >
          {submitText}
        </button>
      </form>
      <span className="sign-pane__server-response">
        {formData.showError._global && formData.errorText._global}
      </span>
      {/* <span className="sign-pane__server-response">
        Что-то пошло не так!
      </span> */}
      <nav className="sign-pane__nav">
        <span className="sign-pane__prompt">{prompt}</span>
        <Link className="sign-pane__link interactive-type-2" to={linkPath}>
          {linkText}
        </Link>
      </nav>
    </div>
  );
}
