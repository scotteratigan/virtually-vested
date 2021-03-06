import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import Background from '../images/bg4.jpg';
import Start from '../images/img4.jpg';
import Manage from '../images/img5.jpg';
import Research from '../images/img6.jpg';
import Logo from '../images/logo.png';
import { Col, Row, Container } from '../components/Grid';
import { Link } from 'react-router-dom';
import LogIn from '../components/LogIn/LogIn';
import LogOut from '../components/LogOut/LogOut';

const anchorRef = React.createRef(LogIn);

class Index extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='lg-12'>
            <div style={{ backgroundImage: `url(${Background})`, textAlign: 'center' }}>
              <Jumbotron size='lg-12'>
                <h1>
                  <img src={Logo} alt='Virtually Vested' />
                </h1>
              </Jumbotron>
              <h1 style={{ color: 'white', textShadow: '0 0 5px green', textDecoration: 'underline' }}>The Real-time Virtual Stock Trading App</h1>
              <br /><br />
              <span style={{ float: 'none', padding: '30px' }}>
                <Link to='/portfolio'>
                  <h3 style={{ color: 'white', textShadow: '0 0 3px green', textDecoration: 'underline', padding: '10px' }}>Begin New Simulation</h3>
                  <img src={Start} style={{ backgroundColor: 'black', padding: '20px' }} alt='Start' /><br />
                </Link>
              </span>
              <span style={{ display: 'block', float: 'left', padding: '40px' }}>
                <h3 style={{ textShadow: '0 0 3px green', textDecoration: 'underline' }}>Manage my Portfolio</h3>
                <img src={Manage} style={{ backgroundColor: 'white' }} alt='Manage' /><br />
              </span>
              <span style={{ display: 'inline', float: 'right', padding: '40px' }}>
                <Link to='/stockhistory'>
                  <h3 style={{ textShadow: '0 0 3px green', textDecoration: 'underline' }}>Research</h3>
                  <img src={Research} style={{ backgroundColor: 'white' }} alt='Research' /><br />
                </Link>
              </span>
            </div>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Index;