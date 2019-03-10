import React, { Component } from 'react';
import API from '../../utils/API';
import { formatQuotedPrice } from '../../utils/misc';

// props.symbol = name of stock to look up

class StockPriceLive extends Component {
  state = {
    price: '',
    interval: null
  }

  componentDidMount = () => {
    this.setState({ quantity: this.props.quantity || 1 });
    this.setState({ interval: setInterval(this.getPrice, 60000) });
    this.getPrice();
  }

  componentWillUnmount = () => {
    // need to clear out the interval when navigating away from component
    this.setState({ interval: null });
  }

  getPrice = async () => {
    const res = await API.getCurrentPrice(this.props.symbol);
    if (res.data.price === 'undefined') return;
    const { price } = res.data;
    const formattedPrice = formatQuotedPrice(price * this.state.quantity);
    this.setState({ price: formattedPrice });
  }

  render() {
    return (
      <>
        {this.state.price}
      </>
    );
  }
}

export default StockPriceLive;