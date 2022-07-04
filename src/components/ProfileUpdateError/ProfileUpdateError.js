import React from 'react';

function ProfileUpdateError({ errorText }) {
  return (
    <span
      className='profile-update-error'
      aria-live="polite"
    >
      {errorText}
    </span>
  );
}

export default ProfileUpdateError;
