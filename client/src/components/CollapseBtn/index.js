import React, { Component } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";

class CollapseBtn extends Component {
state = {
  collapseID: ""
}

toggleCollapse = collapseID => () => {
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));
}

render() {
  return (
      <>
        <MDBBtn color="info" onClick={this.toggleCollapse("basicCollapse")} style={{ marginBottom: "1rem" }}>
          +
        </MDBBtn>
        <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
          <p>
            Lot1 | Purchase Date | Qty | Cost Basis | Gain/Loss | % Gain/Loss | - [0] + Sell Btn
          </p>
        </MDBCollapse>
      </>
    );
  }
}


export default CollapseBtn;