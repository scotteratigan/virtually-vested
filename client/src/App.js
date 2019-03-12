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
    user: {}, // user object, contains token, name, email, cash, portfolioValue
    userLoggedIn: false,
    transactions: [], // all buy and sell records
    stockPortfolio: [], // record of stocks currently owned
    stockInfo: {} // current market prices
  }
  // todo: add /tos and /privacy routes (required by Twitter login API)

  logUserIn = token => {
    this.setState({ userLoggedIn: true, user: { token } }, () => {
      console.log('Calling loadUserData with token:', this.state.user.token);
      this.loadUserData(this.state.user.token);
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
    });
  }

  loadUserData = token => {
    API.getUser(token).then(res => {
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
        const { tickerSymbol, quantity } = transaction;
        if (!transactions[tickerSymbol]) transactions[tickerSymbol] = 0;
        transactions[tickerSymbol] += parseInt(quantity);
        return transactions;
      }, {}
    );
    console.log('Portfolio is:', portfolioObj);
    // now convert this object to an array:
    let stockPortfolio = [];
    for (let stock in portfolioObj) {
      stockPortfolio.push({ tickerSymbol: stock, quantity: portfolioObj[stock] });
    }
    stockPortfolio = stockPortfolio.filter(stock => stock.quantity > 0); // filter out negative or zero stocks
    console.log('Portfolio array is:', stockPortfolio);
    this.setState({ stockPortfolio }, this.getAllStockInfo);
  }

  getAllStockInfo = () => {
    const stockInfoPromises = this.state.stockPortfolio.map(async stock => {
      return API.getCurrentPrice(stock.tickerSymbol);
    });
    const stockInfo = {};
    Promise.all(stockInfoPromises).then(responses => {
      responses.forEach(response => {
        console.log('App.js response:', response);
        const { data } = response;
        stockInfo[data.tickerSymbol] = { ...data }
      });
      this.setState({ stockInfo })
    });
  }

  render() {
    return (
      <Router>
        <>
          {/* Pass login info to Nav to pass into login component */}
          {/* <Nav userLoggedIn={this.state.userLoggedIn} userToken={this.state.userToken} logUserIn={this.logUserIn} /> */}
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
                user={this.state.user} />}
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
