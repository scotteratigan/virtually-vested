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