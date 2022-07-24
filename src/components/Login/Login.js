import React from 'react';

import AuthForm from '../AuthForm/AuthForm';

import useFormWithValidation from '../../hooks/useFormValidation';

const INPUTS_DATA = [
  {
    key: 1,
    inputClassName: '',
    labelClassName: '',
    type: 'email',
    id: 'email',
    label: 'E-mail',
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    key: 2,
    inputClassName: '',
    labelClassName: '',
    type: 'password',
    id: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    name: 'password',
  },
];

const SUBMIT_BUTTON_SETTINGS = {
  type: 'submit',
  title: 'Войти',
};

const FORM_AUTH_QUESTION_SETTINGS = {
  questionText: 'Ещё не зарегистрированы? ',
};

const ROUTE_LINK_SETTINGS = {
  linkTitle: 'Регистрация',
  linkPath: '/signup',
};

const TITLE_TEXT = 'Рады видеть!';

const LOGIN_STYLE_SETTINGS = {
  main: 'login',
  header: 'register__header',
  title: 'register__title',
};

function Login({ signInHandler, error }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({
    validators: {
      email: [
        {
          type: 'required',
        },
        {
          type: 'regexp',
          mask: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          error: 'Введите корректный email',
        },
      ],
      password: [
        {
          type: 'required',
        },
        {
          type: 'range',
          min: 8,
          max: 30,
        },
      ],
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signInHandler(values.email, values.password);
    resetForm();
  };

  return (
    <main
      className={LOGIN_STYLE_SETTINGS.main}
    >
      <AuthForm
        titleText={TITLE_TEXT}
        inputsData={INPUTS_DATA}
        onChange={handleChange}
        values={values}
        error={error}
        errors={errors}
        onSubmit={handleSubmit}
        submitButtonSettings={SUBMIT_BUTTON_SETTINGS}
        formAuthQuestionSettings={FORM_AUTH_QUESTION_SETTINGS}
        routeLinkSettings={ROUTE_LINK_SETTINGS}
        formIsValid={isValid}
      />
    </main>
  );
}

export default Login;
