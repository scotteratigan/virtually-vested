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
      <>
        {/* todo: force buy/sell on same line */}
        <Row className='btn-group btn-group-toggle' data-toggle='buttons' style={{display: 'inline-block', overflow: 'hidden' }}>
          <Col size='sm-6' className='text-center' style={{ margin: '1rem' }}>
            <button onClick={this.handleBuyClick}
              className={this.state.buyMode ? 'btn btn-primary btn-sm' : 'btn btn-outline-info btn-sm'} style={{ marginRight: '-5px', marginBottom: '5px'}}>
              Buy
            </button>
          </Col>
          <Col size='sm-6' className='text-center' style={{ margin: '1rem' }}>
            <button onClick={this.handleSellClick}
              className={!this.state.buyMode ? 'btn btn-primary btn-sm' : 'btn btn-outline-info btn-sm'} style={{ marginLeft: '-5px', marginBottom: '10px'}}>
              Sell
            </button>
          </Col>
        </Row>
        <Row className='text-center counter'>
          <Col size='sm-4'>
            {/* decrement button: */}
            <button className='btn-outline-danger btn-sm' onClick={() => this.props.handleQtyChange(this.props.index, '-')}>
              <i className='fas fa-xs fa-minus' />
            </button>
          </Col>
          <Col size='sm-4' style={{display: 'inline', overflow: 'hidden' }} className='counter-score'>
            {/* netShareChange display: */}
            {Math.abs(this.props.workingPortfolio[this.props.index].netShareChange)}
          </Col>
          <Col size='sm-4'  >
            {/* increment button: */}
            <button className='btn-outline-success btn-sm' style={{ marginLeft: '-10px' }} onClick={() => this.props.handleQtyChange(this.props.index, '+')}>
              <i className='fas fa-xs fa-plus' />
            </button>
          </Col>
        </Row>
      </>
    );
  }
}

export default StockPortfolioCounter;