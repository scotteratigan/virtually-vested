/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { formatCash } from '../../utils/misc';
import StockPortfolioCounter from '../StockPortfolioCounter/StockPortfolioCounter';
import { Link } from 'react-router-dom'
// import '../components/Counter/style.css';
class StockPortfolioItem extends Component {
  state = {
    currValCents: 0,
    ttlCostBasisCents: 0,
    ttlValCents: 0,
    netChange: 0,
    pctChange: 0,
    fmtPctChange: ''
  }

  componentDidMount = () => {
    this.calculateStockInfo();
  }

  componentDidUpdate = prevProps => {
    // re-render everything if the quantity owned has changed:
    if (prevProps.stock.quantity != this.props.stock.quantity) {
      this.calculateStockInfo();
    }
  }

  calculateStockInfo = () => {
    const currValCents = this.getStockPrice(this.props.stock.tickerSymbol);
    const ttlCostBasisCents = Math.abs(this.props.stock.centsTotal);
    const ttlValCents = currValCents * this.props.stock.quantity;
    const netChange = ttlValCents - ttlCostBasisCents;
    let pctChange = (((ttlValCents / ttlCostBasisCents) - 1) * 100).toFixed(2);
    if (isNaN(pctChange)) {
      pctChange = 0.00;
    }
    const fmtPctChange = pctChange < 0 ? '- %' + Math.abs(pctChange).toString() : '+ %' + pctChange.toString();
    this.setState({ currValCents, ttlCostBasisCents, ttlValCents, netChange, pctChange, fmtPctChange });

  }

  getStockPrice = tickerSymbol => {
    if (!this.props.stockInfo[tickerSymbol]) return '';
    return this.props.stockInfo[tickerSymbol].price;
  }

  calculateImpact = () => {
    const symbol = this.props.stock.tickerSymbol;
    if (!this.props.stockInfo[symbol]) return '';
    return formatCash(-this.props.stock.netShareChange * this.props.stockInfo[symbol].price);
  }

  getLink = () => {
    if (!this.props.stockInfo[this.props.stock.tickerSymbol]) {
      // if we don't have the company name, search by ticker symbol
      return this.props.stock.tickerSymbol;
    }
    // otherwise, search by company name
    return this.props.stockInfo[this.props.stock.tickerSymbol].companyName;
  }

  render() {
    return (
      <tr className='list-group-item-action'>
        {/* todo: make row green if positive investment, red if bad? */}
        <td>
          {/* ticker symbol: */}
          <Link to={{
            pathname: '/stockhistory',
            state: {
              tickerSymbol: this.props.stock.tickerSymbol
            }
          }}>{this.props.stock.tickerSymbol}</Link>

          <br />
          {/* link to company news: */}
          {/*  */}
          <a href={`https://news.google.com/search?q=${this.getLink()}`} target='blank'>{this.getLink() + ' News'}</a>
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
          {this.props.stock.quantity > 0 ? formatCash(this.state.ttlValCents) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* cost basis (original cost per share - needs to be calculated, only total cost basis is stored in db) */}
          {this.props.stock.quantity > 0 ? formatCash(this.state.ttlCostBasisCents / this.props.stock.quantity) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* cost basis, total */}
          {this.props.stock.quantity > 0 ? formatCash(this.state.ttlCostBasisCents) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {this.props.stock.quantity > 0 ? formatCash(this.state.netChange) : 'n/a'}
        </td>
        <td className='text-right'>
          {/* total gain/loss */}
          {this.props.stock.quantity > 0 ? this.state.fmtPctChange : 'n/a'}
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