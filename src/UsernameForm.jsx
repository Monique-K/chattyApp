import React, {Component} from 'react';

class UsernameForm extends Component {

  render() {
    return (
      <input onKeyUp={this.props.onKeyUp} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    )
  }

}


export default UsernameForm;