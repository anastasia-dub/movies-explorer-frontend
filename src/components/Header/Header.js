import React from 'react';

import AuthNavigation from '../AuthNavigation/AuthNavigation';

import Navigation from '../Navigation/Navigation';

import LogoLink from '../LogoLink/LogoLink';

import MenuButton from '../MenuButton/MenuButton';

function Header(props) {
  return (
    <div className={`header${props.absolute ? ' header_absolute' : ''}`}>
        <header
      className="header-content"
    >
      <LogoLink />
        {props.loggedIn ? (
            <Navigation />
        ) : (
            <AuthNavigation />
        )}
      {props.loggedIn && (
          <MenuButton
            onOpenMenu={props.onOpenMenu}
          />
      )}
    </header>
    </div>
  );
}

export default Header;
