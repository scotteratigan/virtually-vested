import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import StockHistory from './components/StockHistory/StockHistory';
import Index from './pages/Index';
import NoMatch from './pages/NoMatch';
import Portfolio from './pages/Portfolio';
import TradeHistory from './pages/TradeHistory';
import SignUp from './components/SignUp/SignUp';
import GrabLoginInfo from './components/GrabLoginInfo/GrabLoginInfo';
import API from './utils/API';

class App extends Component {
  state = {
    user: {}, // user object, contains token, name, email, cash
    userLoggedIn: false,
    portfolioValue: 0, // passed to portfolio page for display
    transactions: [], // all buy and sell records
    stockPortfolio: [], // record of stocks currently owned, used here to get current quotes
    stockInfo: {} // object storing all current market prices and company names
  }

  // todo: add /tos and /privacy routes (required by Twitter login API)

  logUserIn = (token, email) => {
    this.setState({ userLoggedIn: true, user: { token, email } }, () => {
      console.log('Calling loadUserData with token:', this.state.user.token);
      this.loadUserData(this.state.user);
      this.loadUserTransactions(this.state.user.token);
    });
  }

  logUserOut = () => {
    this.setState({
      user: {},
      userLoggedIn: false,
      transactions: [],
      stockPortfolio: []
      // note: don't wipe out stock info/prices
      // todo: delete local token
    }, () => {
      // now delete the cookie:
      localStorage.removeItem('isLoggedIn');
      document.cookie.split(';').forEach(item => {
        // console.log('cookie item is:', item);
        document.cookie = item + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
      });
      window.location.href = window.location.hostname === 'localhost' ?
        'https://scotte.auth0.com/v2/logout?returnTo=http://localhost:3000&client_id=fLrth2SyXCru10XKaJflwtXu-YZ7ecVU' :
        'https://scotte.auth0.com/v2/logout?returnTo=https://virtuallyvested.herokuapp.com/&client_id=fLrth2SyXCru10XKaJflwtXu-YZ7ecVU';
    });
  }

  loadUserData = user => {
    API.getUser(user).then(res => {
      console.log('App.js loadUserData: data is loaded:', res.data);
      this.setState({ user: { ...res.data } });
    });
    // todo: retry if db connection fails - was happening often on home PC
  };

  loadUserTransactions = token => {
    API.getTrades(token).then(res => {
      console.log('App.js loadUserTransactions:', res.data);
      this.setState({ transactions: [...res.data] }, this.calculateCurrentStockList);
    })
  }

  calculateCurrentStockList = () => {
    // after stock transactions are loaded into state, figure out which stocks the user owns:
    let portfolioObj = this.state.transactions.reduce(
      (transactions, transaction) => {
        const { tickerSymbol, quantity, centsTotal } = transaction; // todo: add cost basis
        if (!transactions[tickerSymbol]) transactions[tickerSymbol] = { quantity: 0, centsTotal: 0 };
        transactions[tickerSymbol].quantity += parseInt(quantity);
        transactions[tickerSymbol].centsTotal += parseInt(centsTotal);
        return transactions;
      }, {}
    );
    // now convert this object to an array:
    let stockPortfolio = [];
    for (let stock in portfolioObj) {
      stockPortfolio.push({ tickerSymbol: stock, quantity: portfolioObj[stock].quantity, centsTotal: portfolioObj[stock].centsTotal });
    }
    stockPortfolio = stockPortfolio.filter(stock => stock.quantity > 0); // filter out negative or zero stocks
    this.setState({ stockPortfolio }, this.getAllStockInfo);
  }

  getAllStockInfo = () => {
    const stockInfoPromises = this.state.stockPortfolio.map(async stock => {
      return API.getCurrentPrice(stock.tickerSymbol);
    });
    const stockInfo = {};
    Promise.all(stockInfoPromises).then(responses => {
      responses.forEach(response => {
        const { data } = response;
        stockInfo[data.tickerSymbol] = { ...data };
      });
      const portfolioValue = this.state.stockPortfolio.reduce((totalVal, stock) => totalVal + Math.abs(stock.centsTotal), 0);
      this.setState({ stockInfo, portfolioValue });
    });
  }

  getNewStockInfo = tickerSymbol => {
    return new Promise((resolve, reject) => {
      API.getCurrentPrice(tickerSymbol).then(res => {
        const stockInfoToAdd = res.data;
        const updatedStockInfo = { ...this.state.stockInfo };
        updatedStockInfo[tickerSymbol] = stockInfoToAdd;
        this.setState({ stockInfo: updatedStockInfo }, () => {
          return resolve();
        })
      });
    });
  }

  submitTrade = async (transData) => {
    console.log('App.js submitTrade firing:', JSON.stringify(transData));
    const response = await API.makeTrade({ trades: transData, token: this.state.user.token });
    // alert('response is:' + JSON.stringify(response));
    if (response.status === 200) {
      alert('Trade was successful!');
      const { token, email } = this.state.user;
      this.logUserIn(token, email);
    }
    else {
      alert('Trade failed - ' + JSON.stringify(response.data));
    }
  }

  render() {
    return (
      <Router>
        <>
          {/* Pass login info to Nav to pass into login component */}
          <Nav userLoggedIn={this.state.userLoggedIn} user={this.state.user} logUserOut={this.logUserOut} />
          <Switch>
            <Route exact path='/' component={Index} />
            {/* Need this funky routing to pass props. See:
            https://tylermcginnis.com/react-router-pass-props-to-components/ */}
            <Route exact
              path='/portfolio'
              render={(props) => <Portfolio {...props}
                stockPortfolio={this.state.stockPortfolio}
                stockInfo={this.state.stockInfo}
                user={this.state.user}
                userLoggedIn={this.state.userLoggedIn}
                getNewStockInfo={this.getNewStockInfo}
                portfolioValue={this.state.portfolioValue}
                submitTrade={this.submitTrade} />}
            />
            <Route exact
              path='/trades'
              render={(props) => <TradeHistory {...props}
                transactions={this.state.transactions}
                stockInfo={this.state.stockInfo}
                user={this.state.user} />}
            />
            <Route exact path='/stockhistory' component={StockHistory} />
            <Route exact path='/signup' component={SignUp} />
            <Route
              path='/loggedin'
              render={(props) => <GrabLoginInfo {...props}
                logUserIn={this.logUserIn} />}
            />

            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
