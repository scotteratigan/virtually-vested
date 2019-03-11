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
    user: {},
    userLoggedIn: false,
    transactions: [],
    stockPrices: []
  }
  // todo: add /tos and /privacy routes (required by Twitter login API)

  logUserIn = token => {
    this.setState({ userLoggedIn: true, user: { token } }, () => {
      console.log('Calling loadUserData with token:', this.state.user.token);
      this.loadUserData(this.state.user.token);
    });
  }

  logUserOut = () => {
    this.setState({
      user: {},
      userLoggedIn: false,
      transactions: [],
    }); // note: don't wipe out stock prices, no point
  }

  loadUserData = token => {
    console.log("Attempting to load user data with token:", token);
    API.getUser(token).then(res => {
      // alert(JSON.stringify(res.data));
      console.log('App.js loadUserData: data is loaded:', res.data);
      this.setState({ user: { ...res.data } }, this.calculateCurrentStockList());
    });
    // todo: retry if db connection fails - was happening often on home PC
  };

  componentDidUpdate = () => {
    if (this.state.userLoggedIn) {
      console.log(`We're LOGGED IN baby!`);
    }
  }

  calculateCurrentStockList = () => {
    alert('Calculating stock list now that we\'re logged in.');
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
                transactions={this.state.transactions}
                user={this.state.user} />}
            />
            <Route exact
              path='/trades'
              render={(props) => <TradeHistory {...props}
                transactions={this.state.transactions}
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
