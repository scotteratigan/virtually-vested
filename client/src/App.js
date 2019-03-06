import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import History from './components/DailyHistory/DailyHistory'

class App extends Component {
  state = {

  }
  // state will  be used to track logged-in status

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/portfolio' component={Portfolio} />
            <Route exact path='/history' component={History} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
