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
    stockInfo: {}, // current market prices
    rerenderStockInfo: false // a bool switch to trigger re-render of components using stock prices/info
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
      this.setState({ stockInfo, rerenderStockInfo: !this.state.rerenderStockInfo });
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
                rerenderStockInfo={this.state.rerenderStockInfo}
                user={this.state.user}
                getNewStockInfo={this.getNewStockInfo} />}
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
