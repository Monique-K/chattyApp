import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";


class NewMessage extends Component {

  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.newUsername}</span>
        <span className="message-content">{}</span>
     </div>
    )
  }

}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      numClients: 0
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(`ws://localhost:3001`);

    this.socket.onmessage = e => {
      const msg = JSON.parse(e.data);
      switch(msg.type) {
      case "postMessage":
      //This is a message from a user
        this.setState(prevState => ({
          ...prevState,
          messages: prevState.messages.concat(msg)
        }));
        break;
      case "postNotification":
      //This is a notification that a username has changed
        this.setState(prevState => ({
          ...prevState,
          messages: prevState.messages.concat(msg)
        }));
        break;
        case "numClients":
        //This is a notification that the number of clients has changed
          this.setState({ numClients: msg.numClients });
        break;
      default:
        console.error("Unknown event type", msg.type);
      };

    }
  }

//let the server know that a username has been updated
  notifyNewUsername = (oldUsername, newUsername) => {
    let message = {
            type: "postNotification",
            oldUsername: oldUsername,
            newUsername: newUsername,
          }
    this.socket.send(JSON.stringify(message))
  }

//send the latest message to the server for broadcast
  addNewMsg = (msgContent, user) => {
    let newMsg = {
            type: "postMessage",
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
          <div className="num-clients">{this.state.numClients} users online</div>
        </nav>
          <MessageList messages={this.state.messages} />
        <ChatBar addNewMsg={this.addNewMsg} updateUser={this.notifyNewUsername} onKeyUp={this.setUsername} />
      </div>
    );
  }

};



export default App;
