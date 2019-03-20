/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Col, Row } from '../Grid';
import './style.css';


class StockPortfolioCounter extends Component {
  state = { buyMode: true }

  handleBuyClick = () => {
    this.setState({ buyMode: true });
    this.props.handleQtyChange(this.props.index, 'buy');
  }

  handleSellClick = () => {
    this.setState({ buyMode: false });
    this.props.handleQtyChange(this.props.index, 'sell');
  }

  render() {
    return (
      <div className='mx-auto'>
        {/* todo: force buy/sell on same line */}
        <Row className='btn-group btn-group-toggle mx-auto' data-toggle='buttons'>
          <Col size='6' className='text-center mx-0'>
            <button onClick={this.handleBuyClick}
              className={this.state.buyMode ? 'btn btn-primary btn-sm' : 'btn btn-outline-info btn-sm'}>
              Buy
            </button>
          </Col>
          <Col size='6' className='text-center mx-0'>
            <button onClick={this.handleSellClick}
              className={!this.state.buyMode ? 'btn btn-primary btn-sm' : 'btn btn-outline-info btn-sm'}>
              Sell
            </button>
          </Col>
        </Row>
        <Row className='text-center mt-1'>
          <Col size='4' className='text-center'>
            {/* decrement button: */}
            <button className='btn-outline-danger btn-sm' onClick={() => this.props.handleQtyChange(this.props.index, '-')}>
              <i className='fas fa-xs fa-minus' />
            </button>
          </Col>
          <Col size='4' className=''>
            {/* netShareChange display: */}
            <div className='text-center'>
              <strong>
                {Math.abs(this.props.workingPortfolio[this.props.index].netShareChange)}
              </strong>
            </div>
          </Col>
          <Col size='4' className='text-center'>
            {/* increment button: */}
            <button className='btn-outline-success btn-sm' onClick={() => this.props.handleQtyChange(this.props.index, '+')}>
              <i className='fas fa-xs fa-plus' />
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StockPortfolioCounter;