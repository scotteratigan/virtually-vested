import React from 'react';

function Jumbotron({ children }) {
    // todo: implement: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    return (
        <div
            style={{ clear: 'both', textAlign: 'center' }}
            className='jumbotron shadow p-3 mb-5 bg-light rounded'
        >
            {children}
        </div>
    );
}

export default Jumbotron;
