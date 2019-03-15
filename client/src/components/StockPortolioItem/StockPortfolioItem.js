/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { formatCash } from '../../utils/misc';
import StockPortfolioCounter from '../StockPortfolioCounter/StockPortfolioCounter';
// import '../components/Counter/style.css';
class StockPortfolioItem extends Component {
  // state = {
  //   ttlCostBasisCents: '',
  //   currValCents: '',
  //   ttlValCents: '',
  //   netChange: '',
  //   pctChange: '',
  //   fmtPctChange: ''
  // }

  // componentDidMount = () => {
  //   const ttlCostBasisCents = Math.abs(this.props.stock.centsTotal);
  //   const currValCents = this.getStockPrice(this.props.stock.tickerSymbol);
  //   const ttlValCents = currValCents * this.props.stock.quantity;
  //   const netChange = ttlValCents - ttlCostBasisCents;
  //   const pctChange = (((ttlValCents / ttlCostBasisCents) - 1) * 100).toFixed(2);
  //   const fmtPctChange = pctChange < 0 ? '- $' + Math.abs(pctChange).toString() : '+ $' + pctChange.toString();
  //   this.setState({ ttlCostBasisCents, currValCents, ttlValCents, netChange, pctChange, fmtPctChange });
  // }

  getStockPrice = tickerSymbol => {
    if (!this.props.stockInfo[tickerSymbol]) return '';
    return this.props.stockInfo[tickerSymbol].price;
  }

  currValCents = this.getStockPrice(this.props.stock.tickerSymbol);
  ttlCostBasisCents = Math.abs(this.props.stock.centsTotal);
  ttlValCents = this.currValCents * this.props.stock.quantity;
  netChange = this.ttlValCents - this.ttlCostBasisCents;
  pctChange = (((this.ttlValCents / this.ttlCostBasisCents) - 1) * 100).toFixed(2);
  fmtPctChange = this.pctChange < 0 ? '- $' + Math.abs(this.pctChange).toString() : '+ $' + this.pctChange.toString();
  // areEqualShallow(a, b) {
  //   for (var key in a) {
  //     if (a[key] !== b[key]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.areEqualShallow(this.props, nextProps)) return true;
  //   console.log('shouldComponentUpdate?');
  //   console.log('this.props:', this.props);
  //   console.log('nextProps:', nextProps);
  //   if (this.props.stockInfo) {
  //     if (Object.keys(this.props.stockInfo).length != Object.keys(nextProps.stockInfo).length) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // componentWillReceiveProps(nextProps) {

  //   if (JSON.stringify(this.props.stockInfo) !== JSON.stringify(nextProps.stockInfo)) {
  //     alert('rerender!');
  //     // this.render();
  //   }
  // }
  calculateImpact = () => {
    const symbol = this.props.stock.tickerSymbol;
    if (!this.props.stockInfo[symbol]) return '';
    return formatCash(-this.props.stock.netShareChange * this.props.stockInfo[symbol].price);
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
      </tr>
    );
  }
}

export default StockPortfolioItem;