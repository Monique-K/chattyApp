import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './notification.jsx';


class MessageList extends Component {

  getIndividualMsgs = () => {

      const individualMsgs = this.props.messages.map((msg) => {
       return (<Message username={msg.username} type={msg.type} newUsername={msg.newUsername} oldUsername={msg.oldUsername} content={msg.content} key={msg.id} />)
      })
      return individualMsgs;
    }

  render() {
    const individualMsgs = this.props.messages.map((msg) => {
       return (<Message username={msg.username} content={msg.content} />)
    })
    return (
      <main className="messages">
        {this.getIndividualMsgs()}
      </main>
    )
  }

}


export default MessageList;