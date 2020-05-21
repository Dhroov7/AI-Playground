import React, { Component } from "react";
import "../styles/chatbot.css";
import Chat from "./chat";
import axios from 'axios';

class ChatBot extends Component {
  state = {
    userMessage: "",
    chat: [],
    chatBotResponse: ''
  };

  handleSubmit = async (e) => {
    if (e.key === "Enter") {
      if (this.state.userMessage) {
        e.preventDefault();
        await this.setState({ chat: this.state.chat.concat({sender: 'user', value: this.state.userMessage}), userMessage: "" });
        let result = this.createFunctionExpression(this.props.code, this.state.chat[this.state.chat.length - 1].value);
        await this.setState({chat: this.state.chat.concat({sender: 'bot', value: '...'})});
        console.log('here')
        let response = await axios.post('https://shrouded-oasis-94153.herokuapp.com/', {
          code: result
        });
        let newChat = this.state.chat;
        newChat.pop();
        await this.setState({chat: newChat});
        await this.setState({ chat: this.state.chat.concat({sender: 'bot', value: response.data})});
      }
    }
  };

  createFunctionExpression = (code, param) => {
    String.prototype.splice = function (start, delCount, newSubStr) {
      return (
        this.slice(0, start) +
        newSubStr +
        this.slice(start + Math.abs(delCount))
      );
    };
    let startIndexOfFunc = code.indexOf("function");
    code = code.splice(startIndexOfFunc, 0, '(');
    let endIndexOfFunc = code.lastIndexOf("}");
    code = code.splice(endIndexOfFunc + 1, 0, `)('${param}')`);
    return code;
  };

  render() {
    const { chat } = this.state;
    return (
      <div className="chatBot">
        <div className="container">
          <Chat chat={chat} />
        </div>
        <div>
          <input
            className="textBox"
            name="userMessage"
            value={this.state.userMessage}
            type="text"
            placeholder="Type message here..."
            onChange={(event) => {
              this.setState({ userMessage: event.target.value });
            }}
            onKeyDown={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default ChatBot;
