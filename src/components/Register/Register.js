import React from 'react';

import AuthForm from '../AuthForm/AuthForm';

import useFormWithValidation from '../../hooks/useFormValidation';

import REGISTRATION_ERRORS_TEXTS from '../../constants/registration-errors-texts';

function Register({
  regResStatus,
  isLoadingSignup,
  signUpHandler,
  isSignUpError,
}) {
  const [isRegistrationError, setIsRegistrationError] = React.useState(false);
  const [registrationErrorText, setRegistrationErrorText] = React.useState('');

  const formWithValidation = useFormWithValidation({});

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = formWithValidation;

  const { name, email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('handleSubmit', values);
    signUpHandler(name, email, password);
    resetForm();
  };

  const INPUTS_DATA = [
    {
      key: 1,
      type: 'text',
      id: 'name',
      label: 'Имя',
      placeholder: 'Имя',
      name: 'name',
      required: true,
      regexp: '[a-zA-Z -]{2,30}',
      customErrorMessage: 'Поле name может содержать только латиницу, пробел или дефис: a-zA-Z -',
    },
    {
      key: 2,
      inputClassName: '',
      labelClassName: '',
      type: 'email',
      id: 'email',
      label: 'E-mail',
      placeholder: 'E-mail',
      name: 'email',
      required: true,
    },
    {
      key: 3,
      inputClassName: '',
      labelClassName: '',
      type: 'password',
      id: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      name: 'password',
      minLength: 8,
      maxLength: 30,
      required: true,
    },
  ];

  const SUBMIT_BUTTON_SETTINGS = {
    type: 'submit',
    title: 'Зарегистрироваться',
  };

  const FORM_AUTH_QUESTION_SETTINGS = {
    questionText: 'Уже зарегистрированы? ',
  };

  const ROUTE_LINK_SETTINGS = {
    linkTitle: 'Войти',
    linkPath: '/signin',
  };

  const REGISTER_STYLE_SETTINGS = {
    main: 'register',
  };

  const errorHandler = () => {
    if (regResStatus) {
      switch (regResStatus) {
        case 409:
          setIsRegistrationError(true);
          setRegistrationErrorText(REGISTRATION_ERRORS_TEXTS.CONFLICT_EMAIL);
          break;
        case 400:
          setIsRegistrationError(true);
          setRegistrationErrorText(REGISTRATION_ERRORS_TEXTS.BAD_REQUEST);
          break;
        case 200:
          setIsRegistrationError(false);
          setRegistrationErrorText('');
          resetForm();
          break;
        default:
          setIsRegistrationError(true);
          setRegistrationErrorText(REGISTRATION_ERRORS_TEXTS.BAD_REQUEST);
          break;
      }
    }
  };

  React.useEffect(() => {
    errorHandler();
  }, [regResStatus]);

  return (
    <main
      className={REGISTER_STYLE_SETTINGS.main}
    >
      <AuthForm
        titleText='Добро пожаловать!'
        inputsData={INPUTS_DATA}
        onChange={handleChange}
        values={values}
        errors={errors}
        onSubmit={handleSubmit}
        submitButtonSettings={SUBMIT_BUTTON_SETTINGS}
        formAuthQuestionSettings={FORM_AUTH_QUESTION_SETTINGS}
        routeLinkSettings={ROUTE_LINK_SETTINGS}
        formIsValid={isValid}
        authErrorText={registrationErrorText}
        isAuthError={isRegistrationError}
        isLoadingData={isLoadingSignup}
        formData={formWithValidation}
        isSignUpError={isSignUpError}
      />
    </main>
  );
}

export default Register;
