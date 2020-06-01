import React, { Component } from "react";
import "../styles/navbar.css";
import shape from "../images/shape.svg";
import profilePhoto from "../images/profile.jpg";
import { Container, Row, Col } from "react-bootstrap";

class navBar extends Component {
  render() {
    return (
      <Container fluid className="removePadding">
        <Row style={{ marginTop: "14px" }}>
          <Col sm={2} style={{marginLeft: "2%"}}>
            <div className="AI-playground">AI playground</div>
          </Col>
          <Col sm={6} className=" noPadding"></Col>
          <Col className="noPadding">
            <div className="Learn-AI">Learn AI</div>
          </Col>
          <Col sm className="noPadding">
            <div className="Docs">Docs</div>
          </Col>
          <Col sm={2}className="noPadding" style={{ marginRight: "25px" }}>
            <div className="Mask">
              <img className="userPhoto" alt="User" src={profilePhoto} />
            </div>
            <div className="Account">Account</div>
            <img className="Shape" src={shape} alt="down arrow" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default navBar;
