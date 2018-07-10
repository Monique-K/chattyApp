import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

const generateRandomString = () => {
  let randomArray = [];
  let randomString = "";
  let choices ="qwertyuioplkjhgfdsazxcvbnm1234567890"
  for (let i = 0; i < 6; i ++) {
    let randomchoice = Math.floor(Math.random() * 37);
    randomArray.push(choices[randomchoice]);
    randomString = randomArray.join("");
  }
  return randomString;
};

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
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          key: "0123"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          key: "025554"
        }
    ]}
  }

//   componentDidMount() {
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     const newMessage = {id: 3, username: "Michelle", content: "Hello there!", key: "25483"};
//     const messages = this.state.messages.concat(newMessage)

//     this.setState({messages: messages})
//   }, 3000);
// }

  addNewMsg = (event) => {
  if (event.key == "Enter") {
    let oldMsgs = this.state.messages
    let newMsg = {
            username: "Mo",
            content: event.target.value,
            key: generateRandomString()
          }
  this.setState({ messages: [...oldMsgs, newMsg] })
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
}



export default App;
