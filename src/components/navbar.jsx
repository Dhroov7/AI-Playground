import React, { Component } from "react";
import "../styles/navbar.css";
import shape from "../images/shape.svg";
import profilePhoto from "../images/profile.jpg";

class navBar extends Component {
  render() {
    return (
      <div className="row" style={{ marginTop: "14px" }}>
        <div className="col-2 noPadding">
          <div className="AI-playground">AI playground</div>
        </div>
        <div className="col-6 noPadding"></div>
        <div className="col noPadding">
          <div className="Learn-AI">Learn AI</div>
        </div>
        <div className="col noPadding">
          <div className="Docs">Docs</div>
        </div>
        <div className="col-2 noPadding" style={{marginRight: '25px'}}>
          <div className="Mask">
            <img className="userPhoto" alt="User" src={profilePhoto} />
          </div>
          <div className="Account">Account</div>
          <img className="Shape" src={shape} alt="down arrow" />
        </div>
      </div>
    );
  }
}

export default navBar;
