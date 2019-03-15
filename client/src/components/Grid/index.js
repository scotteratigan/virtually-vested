/* eslint-disable react/prop-types */
import React from 'react';

// Exporting the Container, Row, and Col components from this file

// This Container component allows us to use a bootstrap container without worrying about class names
export function Container({ fluid, className, children }) {
  let classNameStr = fluid ? 'container-fluid' : 'container';
  if (className) classNameStr += ' ' + className;
  return <div className={classNameStr}>{children}</div>;
}

// + className !== 'undefined' ? ' ' + className : ''

// This Row component lets us use a bootstrap row without having to think about class names
export function Row({ fluid, className, children }) {
  let classNameStr = fluid ? 'row-fluid' : 'row';
  if (className) classNameStr += ' ' + className;
  return <div className={classNameStr}>{children}</div>;
}

// This Col component lets us size bootstrap columns with less syntax
// e.g. <Col size="md-12"> instead of <div className="col-md-12">
export function Col({ size, className, children }) {
  let classNameStr = size ? size.split(' ').map(size => 'col-' + size).join(' ') : '';
  classNameStr += className ? ' ' + className : '';

  return (
    <div className={classNameStr}>
      {children}
    </div>
  );
}
