import React from 'react';

function ProfileEditButton({
  title,
  onClick,
}) {
  return (
    <button
      className='profile-edit-button'
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ProfileEditButton;
