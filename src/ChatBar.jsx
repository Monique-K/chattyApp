import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      oldUsername: "Anonymous",
      newUsername: "Anonymous"
    }
  }

//set the new username when user presses enter on the username bar
  setUsername = (event) => {
    if (event.key == "Enter") {
      this.props.updateUser(this.state.oldUsername, event.target.value)
      this.setState({ oldUsername: this.state.newUsername, newUsername: event.target.value });
    }
  }

  userChanged = (event) => {
    this.setState({ newUsername: event.target.value  })
  }

  messageChanged = (event) => {
    this.setState({ message: event.target.value })
  }

//send the latest message when user presses enter on the message bar
  addNewMsg = (event) => {
    if (event.key == "Enter") {
      this.props.addNewMsg(this.state.message, this.state.newUsername )
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <footer className="chatbar" id="chatbar-footer">
        <input value={this.state.newUsername} onKeyPress={this.setUsername} onChange={this.userChanged} className="chatbar-username" placeholder="Your username" />
        <input value={this.state.message} onKeyPress={this.addNewMsg} onChange={this.messageChanged} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }

}


export default ChatBar;