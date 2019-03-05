import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import History from './components/DailyHistory/DailyHistory'

class App extends Component {
  state = {

  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' component={Portfolio} />
            <Route exact path='/portfolio' component={Portfolio} />
            <Route exact path='/history' component={History} />
            {/* <Route exact path='/books/:id' component={Detail} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
