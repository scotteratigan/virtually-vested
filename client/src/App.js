import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import StockHistory from './components/StockHistory/StockHistory';
import Index from './pages/Index';
import NoMatch from './pages/NoMatch';
import Portfolio from './pages/Portfolio';
import TradeHistory from './pages/TradeHistory';
import SignUp from './components/SignUp/SignUp';
// import API from './utils/API';
import StockPriceLive from './components/StockPriceLive/StockPriceLive';
import GrabLoginInfo from './components/GrabLoginInfo/GrabLoginInfo';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class App extends Component {
  state = {
    userLoggedIn: false,
    userToken: null,
    transactions: [],
    stockPrices: [],
  }
  // state will  be used to track logged-in status & more
  // todo: add /tos and /privacy routes (required by Twitter login API)

  logUserIn = token => {
    this.setState({ userLoggedIn: true, userToken: token });
  }

  componentDidMount() {
    // if (this.state.userLoggedIn) this.loadUserData();
  }

  loadUserData = () => {
    // todo: retry if db connection fails - was happening often on home PC
    // todo: replace with a filter search when we have other users
    /*API.getUser()
      .then(res => {
        const user = res.data[0];
        this.setState({ user }, () => {
          // grabbing the transactions after user is loaded
          // this may be necessary to ensure I have token in future?
          API.getTrades()
            .then(res => {
              this.setState({ transactions: res.data });
            });
        });
      }).catch(err => console.log(err));
      */
  };

  componentDidUpdate = () => {
    if (this.state.userLoggedIn) {
      console.log(`We're LOGGED IN baby!`);
      // this is when you would make DB calls to load user data...
    }
  }

  render() {
    return (
      <Router history={history}>
        <>
          {/* Pass login info to Nav to pass into login component */}
          <Nav userLoggedIn={this.state.userLoggedIn} userToken={this.state.userToken} logUserIn={this.logUserIn} />
          {/* <StockPriceLive /> */}
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
            {/* todo: look up example of below */}
            {/* <Route path='/loggedin' component={GrabLoginInfo} /> */}
            {/* logUserIn */}
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
