import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import StockHistory from './components/StockHistory/StockHistory';
import Index from './pages/Index';
import NoMatch from './pages/NoMatch';
import Portfolio from './pages/Portfolio';
import TradeHistory from './pages/TradeHistory';

import SignUp from './components/SignUp/SignUp';

class App extends Component {
  state = {
  }
  // state will  be used to track logged-in status & more
  // todo: add /tos and /privacy routes (required by Twitter login API)

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/portfolio' component={Portfolio} />
            <Route exact path='/trades' component={TradeHistory} />
            <Route exact path='/stockhistory' component={StockHistory} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
