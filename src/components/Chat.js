import React from 'react';
import ChatInput from './ChatInput';
import MessageGroup from './MessageGroup';
// eslint-disable-next-line
import discord, { TextChannel } from 'discord.js';

class Chat extends React.Component {
  state = {messages: []}
  

  render() {
    /** @type {TextChannel} */
    const channel = this.props.channel;
    const messages = [];

    channel.fetchMessages({limit: 50}).then(messages => {
      const msgs = messages.array();
      msgs.reverse()
      this.setState({messages: msgs});
    })

    for(let i = 0; i < this.state.messages.length; i++) {
      const msg = this.state.messages[i];
      if(msg == null) continue;

      messages.push(<MessageGroup key={msg.id} message={msg}></MessageGroup>);
    }

    return (
      <div className="Chat">
        <div className="messages" ref={(el) => { this.messages = el; }}>
          {messages}
          <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <ChatInput channel={channel} />
      </div>
    );
  }
}

export default Chat;
