import React from 'react';

const LogOut = props => {
  return (
    <div>
      <button className='btn btn-secondary' onClick={() => props.logUserOut()}>Log Out</button>
    </div>
  );
};

export default LogOut;