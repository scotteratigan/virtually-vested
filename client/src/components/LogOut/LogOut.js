import React from 'react';

const LogOut = props => {
  return (
    <div>
      <button onClick={() => props.logUserOut()}>Log Out</button>
    </div>
  );
};

export default LogOut;