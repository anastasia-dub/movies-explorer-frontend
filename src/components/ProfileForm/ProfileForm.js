import React from 'react';

import FormTitle from '../FormTitle/FormTitle';

import InputField from '../InputField/InputField';

import ProfileUpdateError from '../ProfileUpdateError/ProfileUpdateError';

import SubmitButton from '../SubmitButton/SubmitButton';

import ProfileEditButton from '../ProfileEditButton/ProfileEditButton';

import ProfileSignoutButton from '../ProfileSignOutButton/ProfileSignOutButton';

import Preloader from '../Preloader/Preloader';

function ProfileForm({
  titleText,
  inputsData,
  onChange,
  values,
  errors,
  onSubmit,
  submitButtonSettings,
  formIsValid,
  profileUpdateErrorText,
  isEdited,
  onToggleEditableProfile,
  profileEditButtonSettings,
  profileSignoutButtonSettings,
  onSignOut,
  isLoadingData,
  isUpdateUserProfileError,
}) {
  const formInputsMarkup = inputsData.map((item) => (
    <div
      key={item.key}
      className='profile-form__input-container'
    >
      <label
        className='profile-form__input-label'
      >
        {item.label}
        <InputField
          className='profile-form__input'
          settings={item}
          onChange={onChange}
          value={values[item.name]}
        />
      </label>
      <span
        className='profile-form__input-error'
        aria-live="polite"
      >
        {errors[item.name]}
      </span>
    </div>
  ));

  return (
    <form
      onSubmit={onSubmit}
      className='profile-form'
      noValidate
    >
      <div
        className='profile-form__title'
      >
        <FormTitle
          titleText={titleText}
        />
      </div>
      <fieldset
        className='profile-form__input-fieldset'
        disabled={!isEdited || isLoadingData}
      >
        {formInputsMarkup}
      </fieldset>
      <div
        className='profile-form__container'
      >
        {isUpdateUserProfileError && (
          <ProfileUpdateError
            errorText={profileUpdateErrorText}
          />
        )}
        {isEdited ? (
          <SubmitButton
            disabled={!formIsValid}
            settings={submitButtonSettings}
            className='profile-form__submit-button'
          />
        ) : (
          <>
            {isLoadingData && (
              <Preloader />
            )}
            <ProfileEditButton
              onClick={onToggleEditableProfile}
              title={profileEditButtonSettings.title}
            />
            <ProfileSignoutButton
              title={profileSignoutButtonSettings.title}
              onSignOut={onSignOut}
            />
          </>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
