import React, {Component} from 'react';

class Message extends Component {

  renderMsgType = () => {
    if (this.props.type === "postMessage") {
        return (
          <div>
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
          )
      } else if (this.props.type === "postNotification") {
        return (
          <em>
          <span className="notification-content">{this.props.oldUsername} changed their name to {this.props.newUsername}</span>
          </em>
          )
      }
    }

  render() {
    return (
      <div className="message">
        {this.renderMsgType()}
      </div>
    )
  }
}


export default Message;