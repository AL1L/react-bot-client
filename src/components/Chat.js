import React from 'react';
import ChatInput from './ChatInput';
// eslint-disable-next-line
import discord, { TextChannel } from 'discord.js';

class Chat extends React.Component {

  render() {
    /** @type {TextChannel} */
    const channel = this.props.channel;
    const messages = [];

    channel.fetchMessages({limit: 50});

    for(let i = 0; i < 50; i++) {
      const msg = channel.messages.array()[i];

      messages.push(`${msg}\n`);
    }

    return (
      <div className="Chat">
        <div className="messages">{messages}</div>
        <ChatInput channel={channel} />
      </div>
    );
  }
}

export default Chat;
