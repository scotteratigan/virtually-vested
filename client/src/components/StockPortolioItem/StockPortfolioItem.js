/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { formatCash } from '../../utils/misc';
import StockPortfolioCounter from '../StockPortfolioCounter/StockPortfolioCounter';
// import '../components/Counter/style.css';
class StockPortfolioItem extends Component {

  getStockPrice = tickerSymbol => {
    if (!this.props.stockInfo[tickerSymbol]) return '';
    return this.props.stockInfo[tickerSymbol].price;
  }

  currValCents = this.getStockPrice(this.props.stock.tickerSymbol);
  ttlCostBasisCents = Math.abs(this.props.stock.centsTotal);
  ttlValCents = this.currValCents * this.props.stock.quantity;
  netChange = this.ttlValCents - this.ttlCostBasisCents;
  pctChange = (((this.ttlValCents / this.ttlCostBasisCents) - 1) * 100).toFixed(2);
  fmtPctChange = this.pctChange < 0 ? '- %' + Math.abs(this.pctChange).toString() : '+ %' + this.pctChange.toString();

  calculateImpact = () => {
    const symbol = this.props.stock.tickerSymbol;
    if (!this.props.stockInfo[symbol]) return '';
    return formatCash(-this.props.stock.netShareChange * this.props.stockInfo[symbol].price);
  }

  getLink = () => {
    if (!this.props.stockInfo[this.props.stock.tickerSymbol]) {
      // if we don't have the company name, search by ticker symbol
      return `https://news.google.com/search?q=${this.props.stock.tickerSymbol}`;
    }
    // otherwise, search by company name
    return `https://news.google.com/search?q=${this.props.stockInfo[this.props.stock.tickerSymbol].companyName}`;
  }

  render() {
    return (
      <tr className='list-group-item-action'>
        {/* todo: make row green if positive investment, red if bad? */}
        <td>
          {/* ticker symbol: */}
          {this.props.stock.tickerSymbol} <br />
          {/* link to company news: */}
          {/*  */}
          <a href={this.getLink()} target='blank'>News</a>
        </td>
        <td className='text-right'>
          {/* quantity: */}
          {this.props.stock.quantity}
        </td>
        <td className='text-right'>
          {/* current stock price: */}
          {formatCash(this.currValCents)}
        </td>
        <td className='text-right'>
          {/* current value (price * quantity owned) */}
          {this.props.stock.quantity > 0 ? formatCash(this.ttlValCents) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* cost basis (original cost per share - needs to be calculated, only total cost basis is stored in db) */}
          {this.props.stock.quantity > 0 ? formatCash(this.ttlCostBasisCents / this.props.stock.quantity) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* cost basis, total */}
          {this.props.stock.quantity > 0 ? formatCash(this.ttlCostBasisCents) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {this.props.stock.quantity > 0 ? formatCash(this.netChange) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {this.props.stock.quantity > 0 ? this.fmtPctChange : 'n/a'}
        </td>
        <td>
          <StockPortfolioCounter workingPortfolio={this.props.workingPortfolio} index={this.props.index} handleQtyChange={this.props.handleQtyChange} />
        </td>
        <td className='text-right'>
          {this.calculateImpact()}
        </td>
      </tr >
    );
  }
}

export default StockPortfolioItem;