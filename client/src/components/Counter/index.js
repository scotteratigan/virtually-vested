import React from "react";
import './style.css';

// By extending the React.Component class, Counter inherits functionality from it
function CardBody(props) {
  return (
    <div className='counter'>
      <button className='btn-outline-danger btn-sm' onClick={props.handleDecrement}>
        -
      </button>
      <div className="counter-score" style={{display: 'inline-block', overflow: 'hidden' }}>{props.count}</div>
            
      <button className='btn-outline-success btn-sm' onClick={props.handleIncrement}>
        +
      </button>
    </div>
  );
}

class Counter extends React.Component {
  // Setting the initial state of the Counter component
  state = {
    count: 0
  };

  // handleIncrement increases this.state.count by 1
  handleIncrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ count: this.state.count + 1 });
  };

  // handleDecrement decreases this.state.count by 1
  handleDecrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ count: this.state.count - 1 });
  };

  // The render method returns the JSX that should be rendered
  render() {
    return (
      <div className="card text-center">
        <CardBody
          count={this.state.count}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Counter;