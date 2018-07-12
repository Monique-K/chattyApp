import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

//Format message list into indivudual messages
  getIndividualMsgs = () => {
      const individualMsgs = this.props.messages.map((msg) => {
       return (<Message username={msg.username} type={msg.type} newUsername={msg.newUsername} oldUsername={msg.oldUsername} content={msg.content} key={msg.id} />)
      })
      return individualMsgs;
    }

  render() {
    return (
      <main className="messages">
        {this.getIndividualMsgs()}
      </main>
    )
  }

}


export default MessageList;