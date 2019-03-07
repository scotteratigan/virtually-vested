import React from 'react';

function Jumbotron({ children }) {
  // todo: implement: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
  return (
    <div
      style={{ clear: 'both', paddingTop: 120, textAlign: 'center' }}
      className='jumbotron'
    >
      {children}
    </div>
  );
}

export default Jumbotron;
