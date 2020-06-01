import React, { Component } from "react";
import "../styles/chatbot.css";
import Chat from "./chat";
import axios from "axios";

class ChatBot extends Component {
  constructor() {
    super()
    this.state = {
      userMessage: "",
      chat: [],
      chatBotResponse: "",
    };
  }

  handleSubmit = async (e) => {
    if (e.key === "Enter") {
      if (this.state.userMessage) {
        e.preventDefault();

        //adding user chat message to the chat state.
        await this.setState({
          chat: this.state.chat.concat({
            sender: "user",
            value: this.state.userMessage,
          }),
          userMessage: "",
        });

        let result = this.createFunctionExpression(
          this.props.code,
          this.state.chat[this.state.chat.length - 1].value
        );

        // adding bot loader to the chat state
        await this.setState({
          chat: this.state.chat.concat({ sender: "bot", value: "..." }),
        });

        let response = await axios.post(
          "https://shrouded-oasis-94153.herokuapp.com/",
          {
            code: result,
          }
        );

        let newChat = this.state.chat;
        newChat.pop();

        // remove bot loader from the chat state
        await this.setState({ chat: newChat });

        // adding bot response to the chat state
        await this.setState({
          chat: this.state.chat.concat({
            sender: "bot",
            value: response.data
              ? response.data
              : "Sorry, but i don't know the answer.",
          }),
        });
      }
    }
  };

  // Function for converting function to IIFE.
  createFunctionExpression = (code, param) => {
    // Added splice function for strings.
    String.prototype.splice = function (start, delCount, newSubStr) {
      return (
        this.slice(0, start) +
        newSubStr +
        this.slice(start + Math.abs(delCount))
      );
    };

    let startIndexOfFunc = code.indexOf("function");
    code = code.splice(startIndexOfFunc, 0, "(");

    let endIndexOfFunc = code.lastIndexOf("}");
    code = code.splice(endIndexOfFunc + 1, 0, `)('${param}')`);

    return code;
  };

  render() {
    const { chat } = this.state;
    return (
      <div className="chatBot">
        <div className="chatBotContainer mb-3">
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
