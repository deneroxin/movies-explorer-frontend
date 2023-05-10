import React from 'react';
import { useLocation } from 'react-router-dom';
import FormValidator from './helperClasses/FormValidator';

// Этот хук считывает значения css-свойств DOM-элемента, которые могут зависеть от размеров экрана.
// Элементы передаваемого списка имеют формат:
// [
//   ссылка на DOM-элемент (раннее созданная с помощью React.useRef),
//   имя свойства (строка),
//   функция, описывающая, что делать со значением свойства, когда оно получено
// ]
export function useGetStyleProperties(propList, delay = 100) {
  React.useEffect(function getParamValues() {
    let deferredAction = null;
    function updateParams() {
      propList.forEach(([ ref, name, saveFunction ]) => {
        const styles = window.getComputedStyle(ref.current);
        saveFunction(styles.getPropertyValue(name));
      });
    }
    function handleResize() {
      clearTimeout(deferredAction);
      deferredAction = setTimeout(updateParams, delay);
    }
    window.addEventListener('resize', handleResize);
    updateParams();
    return (() => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(deferredAction);
    });
  }, []);
}


// Этот хук управляет поведением отображения ошибок в полях.
// Он реализует следующий алгоритм поведения:
// При первом появлении формы показ ошибок запрещен.
// Пока пользователь вводит данные в поле, ошибка не высвечивается.
// Как только пользователь перешёл в другое поле,
// сразу разрешается показ ошибки для поля, утратившего фокус,
// но лишь в случае, если ошибка в нём была.
// Если теперь вернуться в поле и начать редактировать,
// ошибка будет продолжать высвечиваться, отражая правильность значения.
// Если же ошибки в поле не было, то при возвращении в это поле,
// если редактирование правильного значения приведёт снова к ошибке,
// сообщение об ошибке не появится, пока мы снова не покинем поле.
export function useValidation(validationObject) {
  const validator = React.useMemo(() => new FormValidator(validationObject), []);
  const didLoseFocus = React.useMemo(() => validator.generateState(false), []);
  const [inputsContent, setInputsContent] = React.useState(() => validator.generateContent(''));
  const [showError, setShowError] = React.useState(fillShowError);

  const formData = React.useMemo(() => ({
    inputsContent,
    showError,
    errorText: validator.getErrorText(),
    onChange: handleInputChange,
    onBlur: handleInputBlur,
  }), [inputsContent, showError]);

  function fillShowError() {
    const errorList = validator.getErrorText();
    return Object.fromEntries(Object.keys(errorList).map((key) => [key, false]));
  }

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setInputsContent(oldFullState =>
      validator.validate({[name]: value}, oldFullState));
  }

  function handleInputBlur(evt) {
    const { name } = evt.target;
    const isInvalid = Boolean(validator.getErrorText()[name]);
    const isGlobalInvalid = Boolean(validator.getErrorText()._global);
    setShowError((oldState) => ({ ...oldState, [name]: isInvalid }));
    didLoseFocus[name] = true;
    if (Object.values(didLoseFocus).every(Boolean))
      setShowError((oldState) => ({ ...oldState, _global: isGlobalInvalid }));
  }

  function setContent(content) {
    return setInputsContent(validator.validate(null, content));
  }

  return [formData, validator.isFormInvalid(), setContent];
}


// Этот хук создаёт ссылку на текущий путь, которая будет всегда актуальна.
// Это полезно, если надо сослаться на текущий путь в отложенной процедуре,
// когда неизвестно, каким он будет во время её срабатывания.
export function useCurrentPathRef() {
  const location = useLocation();
  const currentPath = React.useRef(location.pathname);
  React.useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);
  return currentPath;
}
