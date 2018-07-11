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
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(`ws://localhost:3001`);

    this.socket.onmessage = e => {
      console.log("event", e)
      const msg = JSON.parse(e.data);
      console.log("message", msg)
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }));
    };

  }

  addNewMsg = (event) => {
  if (event.key == "Enter") {
    // let oldMsgs = this.state.messages
    let newMsg = {
            username: "Mo",
            content: event.target.value,
          }
    // this.setState({ messages: [...oldMsgs, newMsg] })
    this.socket.send(JSON.stringify(newMsg));
    event.target.value = "";
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={this.state.messages} />
        <ChatBar onKeyPress={this.addNewMsg} currentUser={this.state.currentUser.name} />
      </div>
    );
  }

};



export default App;
