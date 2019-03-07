import React from 'react';

// If we want a child component to update or pass data to its parent, we can create a method inside the parent for the update
// Then bind the method to the parent, and pass it to the child as a prop

function CardBody(props) {
  return (
    <div>
      <button className="btn btn-success" onClick={props.handleIncrement}>
        +
      </button>
      <p><br />{props.count}</p>
      <button className="btn btn-danger" onClick={props.handleDecrement}>
        -
      </button>
    </div>
  );
}

export default CardBody;