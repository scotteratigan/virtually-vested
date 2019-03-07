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
    // adding random delay to space out the API calls - I keep getting throttled
    // const randDelay = Math.floor(Math.random() * 100); // delay of 0 - 99 ms
    // setTimeout(() => {
    //   this.setState({ interval: setInterval(this.getPrice, 60000) })
    //   this.getPrice();
    // }, randDelay);
    // above code did work, but I'm moving the throttling code to the API route
    this.setState({ interval: setInterval(this.getPrice, 60000) });
    this.getPrice();
  }

  componentWillUnmount = () => {
    // need to clear out the interval when navigating away from component
    this.setState({ interval: null });
  }

  getPrice = async () => {
    const res = await API.getCurrentPrice(this.props.symbol);
    const { price } = res.data;
    // console.log('PRICE IS:', price);
    // console.log('typeof price:', typeof price);
    const formattedPrice = formatQuotedPrice(price);
    // console.log('FORMATTED PRICE:', formattedPrice);
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