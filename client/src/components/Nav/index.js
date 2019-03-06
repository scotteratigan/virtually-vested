import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <a className='navbar-brand' href='/'>
        <i className='fas fa-chart-line'></i>
        Virtually Vested
      </a>
      <div className='color-light'>
        <Link to='/portfolio'>Portfolio</Link>
      </div>
    </nav>
  );
}

export default Nav;
