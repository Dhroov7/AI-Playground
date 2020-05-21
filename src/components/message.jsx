import React, { Component } from "react";
import "../styles/message.css";
import bot1x from "../images/bot-image/bot.png";
import profilePhoto from "../images/profile.jpg";

class Message extends Component {
  messageType = () => {
    // check if the message of from bot
    if (this.props.sender === "bot") {
      // render loader
      if (this.props.value === "...") {
        return (
          <li className="messageOuterBox">
            <div className="listBox" style={{ right: "20px" }}>
              <div className="message">
                <div id="wave">
                  <span class="dot">.</span>
                  <span class="dot">.</span>
                  <span class="dot">.</span>
                </div>
              </div>
              <img
                className="bot"
                src={bot1x}
                style={{ marginLeft: "10px" }}
                alt="chatbot"
              />
            </div>
          </li>
        );
      } else {
        // message response from chatbot
        return (
          <li className="messageOuterBox">
            <div className="listBox" style={{ right: "20px" }}>
              <div className="message">
                <p className="messageText">{this.props.value}</p>
              </div>
              <img
                className="bot"
                src={bot1x}
                style={{ marginLeft: "10px" }}
                alt="chatbot"
              />
            </div>
          </li>
        );
      }
    } else {
      // message from user
      return (
        <li className="messageOuterBox">
          <div className="listBox" style={{ left: "20px" }}>
            <img
              className="bot"
              src={profilePhoto}
              style={{ marginRight: "10px" }}
              alt="chatbot"
            />
            <div className="message">
              <p className="messageText">{this.props.value}</p>
            </div>
          </div>
        </li>
      );
    }
  };

  render() {
    return this.messageType();
  }
}

export default Message;
