import React from 'react';
import './style.css';

// If we want a child component to update or pass data to its parent, we can create a method inside the parent for the update
// Then bind the method to the parent, and pass it to the child as a prop

function CardBody(props) {
    return (
        <div className='counter'>
            <button className='btn-outline-danger btn-sm' onClick={props.handleDecrement}>
        -
            </button>
            <div className="counter-score" style={{display: 'inline-block', overflow: 'hidden' }}>{props.netChangeNumOfShares}</div>
            
            <button className='btn-outline-success btn-sm' onClick={props.handleIncrement}>
        +
            </button>
        </div>
    );
}

export default CardBody;