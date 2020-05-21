import React, { Component } from "react";
import CodeEditor from "./codeeditor";
import ChatBot from "./chatbot";
import "../styles/playground.css";

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
      <div className="row">
        <div className="col-6 noPadding">
          <CodeEditor saveCode={this.saveCode} code={this.state.code} />
        </div>
        <div className="col-1 noPadding">
          <div className="vl"></div>
        </div>
        <div className="col-5 noPadding">
          <ChatBot code={this.state.code} />
        </div>
      </div>
    );
  }
}

export default Playground;
