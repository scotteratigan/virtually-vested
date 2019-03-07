import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <a className='navbar-brand' href='/'>
        <i className='fas fa-chart-line'></i>
        Virtually Vested
      </a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-4'>
          <li className='nav-item'>
            <Link to='/'>
              <span className='text-light'>Home</span>
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-4'>
          <li className='nav-item'>
            <Link to='/portfolio'>
              <span className='text-light'>Portfolio</span>
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-4'>
          <li className='nav-item'>
            <Link to='/stockhistory'>
              <span className='text-light'>Stock History</span>
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-4'>
          <li className='nav-item'>
            <Link to='/trades'>
              <span className='text-light'>Trade History</span>
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-4'>
          <li className='nav-item'>
            <Link to='/login'>
              <span className='text-light'>Login</span>
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default Nav;
