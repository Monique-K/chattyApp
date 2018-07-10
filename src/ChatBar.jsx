import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar" id="chatbar-footer">
        <input className="chatbar-username" placeholder= {this.props.currentUser} />
        <input onKeyPress={this.props.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }

}


export default ChatBar;