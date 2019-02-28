import React from 'react';
import { Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';

function NoMatch() {
  return (
    <Container fluid>
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <h1>
          <i className='fas fa-dumpster-fire'></i>
          <span className='mx-3'>SOMETHING IS BROKEN</span>
          <i className='fas fa-dumpster-fire'></i>
        </h1>
        <h4>Sometimes servers go up and down like the market. Please try again in a minte.</h4>
      </Jumbotron>
    </Container>
  );
}

export default NoMatch;
