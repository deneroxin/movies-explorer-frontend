import React from 'react';
import { Link } from 'react-router-dom';
import { useValidation } from '../../utils/customHooks';
import { FormDataContext } from '../../contexts/contexts';
import './SignPane.css';

export default function SignPane({
  className, title, submitText, prompt, linkText, linkPath,
  children, validationObject, onSubmit, isMakingRequest, response, setResponse
}) {

  const [formData, isFormInvalid] = useValidation(validationObject);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isMakingRequest) onSubmit(formData.inputsContent, setResponse);
  }

  const extraSpace = children.length < 3 ? ' extra-space' : '';
  const makingRequest = isMakingRequest ? ' making-request' : '';
  const error = response.type === 'error' ? ' error' : '';

  return (
    <div className={`sign-pane ${className}`}>
      <Link className="sign-pane__logo site-logo interactive-type-2" to="/" />
      <h1 className="sign-pane__title">{title}</h1>
      <form name="sign-pane" noValidate={true} className="sign-pane__form" onSubmit={handleSubmit}>
        <FormDataContext.Provider value={formData}>
          {children}
        </FormDataContext.Provider>
        <span className={`sign-pane__server-response${extraSpace}${error}`}>
          {response.message}
        </span>
        <button type="submit"
          className={`sign-pane__submit interactive-type-2${makingRequest}`}
          disabled={isFormInvalid}
        >
          {!isMakingRequest ? submitText : ' '}
        </button>
      </form>
      <nav className="sign-pane__nav">
        <span className="sign-pane__prompt">{prompt}</span>
        <Link className="sign-pane__link interactive-type-2" to={linkPath}>
          {linkText}
        </Link>
      </nav>
    </div>
  );
}
