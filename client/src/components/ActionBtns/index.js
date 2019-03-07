import React, { Component } from 'react';

class ActionBtns extends Component {
	state = {
        action: null,
        buttonStyle1: 'btn btn-outline-info',
        buttonStyle2: 'btn btn-outline-info'
    }

    handleInputChange = e => {
        let clicked = e.target.value;
        this.setState({
          action : e.target.value},
          () => {
            if (this.state.buttonStyle1 === 'btn btn-success') {
                this.setState({ buttonStyle1 : 'btn btn-outline-info', buttonStyle2 : 'btn btn-success' })
            } else if (this.state.buttonStyle2 === 'btn btn-success') {
                this.setState({ buttonStyle2 : 'btn btn-outline-info', buttonStyle1 : 'btn btn-success' })
            } else if (clicked === 'buy') {
                this.setState({ buttonStyle1 : 'btn btn-success', buttonStyle2 : 'btn btn-outline-info' })
            } else {
                this.setState({ buttonStyle1 : 'btn btn-outline-info', buttonStyle2 : 'btn btn-success' })
            }
    })
      };
          
        render() {
        return ( 
            <div className='btn-group btn-group-toggle' data-toggle='buttons'>
            <label className={ this.state.buttonStyle1 } style={{ marginRight: '.25rem'}}>
            <input type='radio' style={{ visibility: 'hidden', height: 0,
            width: 0 }} value='buy' checked={this.state.action === 'buy'} onChange={this.handleInputChange} /> Buy
            </label>
            <label className={ this.state.buttonStyle2 }>
            <input type='radio' style={{ visibility: 'hidden', height: 0,
            width: 0 }} value='sell' checked={this.state.action === 'sell'} onChange={this.handleInputChange} /> Sell
            </label>
            </div>
            )
        }
    }

  export default ActionBtns;