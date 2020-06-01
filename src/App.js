import React from "react";
import NavBar from "./components/navbar";
import Playground from "./components/playground";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

const App = () => (
  <div className="App h-100">
    <Container fluid className="removePadding h-100">
      <Row>
        <Col sm={12}>
          <NavBar />
        </Col>
      </Row>
      <Row style={{marginBottom: '0px'}}>
        <Col sm={12}>
          <hr className="Line-2" style={{marginBottom: '0px'}}/>
        </Col>
      </Row>
      <Row className="h-100">
        <Col sm={12}>
          <Playground />
        </Col>
      </Row>
    </Container>
  </div>
);

export default App;
