import React, { Component } from "react";
import CodeEditor from "./codeeditor";
import ChatBot from "./chatbot";
import "../styles/playground.css";
import { Container, Row, Col } from "react-bootstrap";

class Playground extends Component {
  constructor() {
    super();
    this.state = {
      code: "function name (param) {return param;}",
    };
    this.saveCode = this.saveCode.bind(this);
  }

  saveCode = async (code) => {
    await this.setState({ code: code });
  };

  render() {
    return (
      <Container fluid className="removePadding h-100">
        <Row className="h-100">
          <Col sm={5} style={{paddingRight: '0px'}} className="mt-1">
            <CodeEditor saveCode={this.saveCode} code={this.state.code} />
          </Col>
          <Col sm={1} className="removePadding">
            <div className="vl"></div>
          </Col>
          <Col sm={5} style={{marginTop: '10%'}}>
            <ChatBot code={this.state.code} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Playground;
