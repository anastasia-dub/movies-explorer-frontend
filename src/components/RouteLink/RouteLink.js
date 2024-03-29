import React from 'react';
import { Link } from 'react-router-dom';

function RouteLink({ linkPath, linkTitle }) {
  return (
    <Link
      className='route-link'
      to={linkPath}
    >
      {linkTitle}
    </Link>
  );
}

export default RouteLink;
