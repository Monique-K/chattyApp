import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";


class NewMessage extends Component {

  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{}</span>
     </div>
    )
  }

}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(`ws://localhost:3001`);

    this.socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }));
    };

  }

  addNewUser = (username) => {
    let newUser = {
            username: username,
          }
    this.socket.send(JSON.stringify(newUser))
  }

  addNewMsg = (msgContent, user) => {
    let newMsg = {
            username: user,
            content: msgContent,
          }
    this.socket.send(JSON.stringify(newMsg))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={this.state.messages} />
        <ChatBar addNewMsg={this.addNewMsg} updateUser={this.addNewUser} onKeyUp={this.setUsername} />
      </div>
    );
  }

};



export default App;
