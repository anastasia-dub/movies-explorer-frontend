import { useState, useCallback } from 'react';
import pluralize from '../utils/pluralize';

const required = value => {
  if (value.length === 0) {
    return 'Это поле не может быть пустым';
  }

  return null;
};

const regexp = (value, validator) => {
  const isValid = validator.mask.test(value);

  if (!isValid) {
    return validator.error;
  }

  return null;
};

const range = (value, validator) => {
  let isError = false;

  if (validator.min && value.length < validator.min) {
    isError = true;
  }

  if (validator.max && value.length > validator.max) {
    isError = true;
  }

  if (isError) {
    return `Длина значения должна быть${validator.min ? ` от ${validator.min}` : ''}${validator.max ? ` до ${validator.max}` : ''} ${pluralize(validator.max || validator.min, 'символ', 'символа', 'символов')}`;
  }

  return null;
};

const validateOne = (value, validator) => {
  switch (validator.type) {
    case 'required':
      return required(value);
    case 'regexp':
      return regexp(value, validator);
    case 'range':
      return range(value, validator);
    default:
      return null;
  }
};

const validate = (value, validators) => {
  for (let i = 0; i < validators.length; i += 1) {
    const error = validateOne(value, validators[i]);
    if (error) {
      return error;
    }
  }

  return null;
};

export default function useFormWithValidation(props) {
  const [values, setValues] = useState((props && props.defaultValues) || {});
  const [validators] = useState((props && props.validators) || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({
      ...values,
      [name]: value,
    });

    if (Array.isArray(validators[name])) {
      const error = validate(value, validators[name]);

      setErrors({
        ...errors,
        [name]: error,
      });

      setIsValid(!error);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
