/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';

const StockPortfolioCounter = props => {
  console.log('StockPortfolioCounter props:', JSON.stringify(props));
  return (
    <>
      {/* todo: force buy/sell on same line */}
      <button>Buy</button> <button>Sell</button>
      <br />
      <button onClick={() => props.handleQtyChange(props.index, '-')}> - </button>
      {props.workingPortfolio[props.index].netShareChange}
      <button onClick={() => props.handleQtyChange(props.index, '+')}> + </button>
    </>
  );
};

export default StockPortfolioCounter;