import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return ( 
      <footer style={{ height: '10px', paddingTop: '40px', borderTop: '10px' }}>
        <div style={{ height: '10px', paddingTop: '10px', borderTop: '10px' }} className='bg-info mt-5' />
        <div style={{ height: '75px' }} className='bg-primary text-center text-light'>
          <p className='pt-5'>&copy; 2019 Virtually Vested</p>
        </div>
      </footer>
    );
  }
}

export default Footer;