export default class FormValidator {

  constructor(validationObject) {
    this._validationObject = validationObject;
    this._fieldSet = Object.keys(validationObject).filter(name => name[0] != '_');
    this._errorText = {};
  }

  _testAgainstRules(name, data) {
    const ruleSet = this._validationObject[name];
    let errorText = '';
    for (let i = 0; i < ruleSet.length && !errorText; i++) {
      const [rule, message] = ruleSet[i];
      const result = rule(data);
      errorText = (typeof result == 'string' ? result : (result ? '' : message));
    }
    this._errorText[name] = errorText;
  }

  validate(fieldsModified, oldValues) {
    const arrayOfModified = Object.entries(fieldsModified || oldValues);
    const newValues = {...oldValues, ...fieldsModified};
    arrayOfModified.forEach(([name, text]) => this._testAgainstRules(name, text));
    if (this._validationObject._global) this._testAgainstRules('_global', newValues);
    this._isInvalid = Object.values(this._errorText).some(Boolean);
    return newValues;
  };

  generateState(value) {
    return Object.fromEntries(this._fieldSet.map(name => [name, value]));
  }

  generateContent(value) {
    return this.validate(null, this.generateState(value));
  }

  getErrorText() {
    return this._errorText;
  }

  isFormInvalid() {
    return this._isInvalid;
  }
}
