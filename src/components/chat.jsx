import React, { Component } from "react";
import Message from "./message";
import "../styles/chat.css";

class Chat extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  render() {
    return (
      <ul className="chat">
        {this.props.chat.map((message, i) => (
          <Message value={message.value} sender={message.sender} key={i} />
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </ul>
    );
  }
}

export default Chat;
