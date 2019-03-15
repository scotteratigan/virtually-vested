/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { formatCash } from '../../utils/misc';
import StockPortfolioCounter from '../StockPortfolioCounter/StockPortfolioCounter';
// import '../components/Counter/style.css';
class StockPortfolioItem extends Component {
  state = {
    ttlCostBasisCents: '',
    currValCents: '',
    ttlValCents: '',
    netChange: '',
    pctChange: '',
    fmtPctChange: ''
  }

  componentDidMount = () => {
    const ttlCostBasisCents = Math.abs(this.props.stock.centsTotal);
    const currValCents = this.getStockPrice(this.props.stock.tickerSymbol);
    const ttlValCents = currValCents * this.props.stock.quantity;
    const netChange = ttlValCents - ttlCostBasisCents;
    const pctChange = (((ttlValCents / ttlCostBasisCents) - 1) * 100).toFixed(2);
    const fmtPctChange = pctChange < 0 ? '- $' + Math.abs(pctChange).toString() : '+ $' + pctChange.toString();
    this.setState({ ttlCostBasisCents, currValCents, ttlValCents, netChange, pctChange, fmtPctChange });
  }

  getStockPrice = tickerSymbol => {
    if (!this.props.stockInfo[tickerSymbol]) return '';
    return this.props.stockInfo[tickerSymbol].price;
  }


  render() {
    return (
      <tr className='list-group-item-action'>
        {/* todo: make row green if positive investment, red if bad? */}
        <td>
          {/* ticker symbol: */}
          {this.props.stock.tickerSymbol} <br />
          {/* link to company news: */}
          {'link...'}
        </td>
        <td className='text-right'>
          {/* quantity: */}
          {this.props.stock.quantity}
        </td>
        <td className='text-right'>
          {/* current stock price: */}
          {formatCash(this.state.currValCents)}
        </td>
        <td className='text-right'>
          {/* current value (price * quantity owned) */}
          {formatCash(this.state.ttlValCents)}
        </td>
        <td className='text-right'>
          {/* cost basis (original cost per share - needs to be calculated, only total cost basis is stored in db) */}
          {formatCash(this.state.ttlCostBasisCents / this.props.stock.quantity)}
        </td>
        <td className='text-right'>
          {/* cost basis, total */}
          {formatCash(this.state.ttlCostBasisCents)}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {formatCash(this.state.netChange)}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {this.state.fmtPctChange}
        </td>
        <td>
          <StockPortfolioCounter workingPortfolio={this.props.workingPortfolio} index={this.props.index} handleQtyChange={this.props.handleQtyChange} />
        </td>
      </tr>
    );
  }
}

export default StockPortfolioItem;

// <tr key={stock.tickerSymbol} className={'list-group-item-action'} >
//   <td style={{ display: 'block' }}>{stock.tickerSymbol}</td>
//   <td style={{ display: 'block' }}><a href={`https://news.google.com/search?q=${this.props.stockInfo[stock.tickerSymbol].companyName}`}
//     rel='noopener noreferrer' target='_blank'>{this.props.stockInfo[stock.tickerSymbol].companyName} Info</a></td>
//   <td>{stock.quantity}</td>
//   <td>{'API data'}</td>
//   <td>{'calc using API data'}</td>
//   <td className='text-center'>{formatCash(Math.abs(stock.price))}</td>
//   <td className='text-right'>{formatCash(Math.abs(stock.price * stock.qty))}</td>
//   <td>{'calc using API data'}</td>
//   <td>{'calc using API data'}</td>
//   <td style={{ columnCount: 3 }}>
//     <td style={{ display: 'block' }}><ActionBtns /></td>
//     <td style={{ display: 'block' }}>
//       <div className='card text-center'>

//         {/* Counter Div */}
//         <div className='counter' count={stock.netShareChange} name={stock.tickerSymbol}
//           handleIncrement={this.handleIncrement}
//           handleDecrement={this.handleDecrement}>

//           {/* Decrement button */}
//           <button className='btn-outline-danger btn-sm' onClick={() => this.handleDecrement(index)}>
//             -
//           </button>

//           {/* Score display */}
//           <div className='counter-score' style={{ display: 'inline-block', overflow: 'hidden' }}>{stock.netShareChange}</div>

//           {/* Increment button */}
//           <button className='btn-outline-success btn-sm' onClick={() => this.handleIncrement(index)}>
//             +
//           </button>

//         </div>
//       </div>
//     </td>
//     <td style={{ fontSize: '.75rem', display: 'block' }}>Est. Total Gain/Loss: {'calc using API data'}</td>
//     <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Cash on Hand: {'calc using API data'}</td>
//     <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio Value: {'calc using API data'}</td>
//     <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio % Gain/Loss: {'calc using API data'}</td>
//   </td>
//   <td><button className={'btn ' + stock.quantity ? 'btn-secondary' : 'btn-danger'} onClick={() => this.deleteStock(index)}>delete</button></td>
//   {/* <td className='text-right'><Moment format='MM-DD-YYYY HH:mm a'>{trade.date}</Moment></td> */}
// </tr>