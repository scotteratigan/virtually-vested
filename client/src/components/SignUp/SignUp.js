/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  handleChange = event => {
    // console.log('event.target:', event.target)
    // console.log('event.target.name:', event.target.name)
    // console.log('event.target.value:', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log('sign-up handleSubmit, username: ');
    console.log(this.state.username);
    if (this.state.username && this.state.username.length >= 6 && this.state.password && this.state.password.length >= 6 && this.state.password === this.state.confirmPassword) {
      console.log('Proceed to login');
    } else {
      console.log('Abort login, something isnt right.');
      console.log(`Username: ${this.state.username} Password: ${this.state.password} Confirm: ${this.state.confirmPassword}`);
      return;
    }

    //request to server to add a new username/password
    axios.post('/api/user/signup', {
      username: this.state.username,
      password: this.state.password // todo: actually hash password
    })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          alert('successful signup');
          this.setState({ //redirect to login page
            redirectTo: '/login'
          });
        } else {
          console.log('username already taken');
        }
      }).catch(error => {
        console.log('signup error: ');
        console.log(error);
      });
  }


  render() {
    return (
      <div className='SignupForm'>
        <h4>Sign up</h4>
        <form className=''>
          <div className='form-group'>
            <div className='col-1 col-ml-auto'>
              <label className='form-label' htmlFor='username'>Username</label>
            </div>
            <div className='col-3 col-mr-auto'>
              <input className='form-input'
                type='text'
                id='username'
                name='username'
                placeholder='Username'
                value={this.state.username}
                onChange={this.handleChange}
              />
              Minimum 6 characters.
            </div>
          </div>
          <div className='form-group'>
            <div className='col-1 col-ml-auto'>
              <label className='form-label' htmlFor='password'>Password: </label>
            </div>
            <div className='col-3 col-mr-auto'>
              <input className='form-input'
                placeholder='password'
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
              Minimum 6 characters.
            </div>
          </div>
          <div className='form-group'>
            <div className='col-1 col-ml-auto'>
              <label className='form-label' htmlFor='confirmPassword'>Confirm Password: </label>
            </div>
            <div className='col-3 col-mr-auto'>
              <input className='form-input'
                placeholder='retype password'
                type='password'
                name='confirmPassword'
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-7'></div>
            <button
              className='btn btn-primary'
              onClick={this.handleSubmit}
              type='submit'
            >Sign up</button>
          </div>
        </form>
      </div>

    );
  }
}

export default SignUp;