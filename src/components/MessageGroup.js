import React from 'react';
// eslint-disable-next-line
import discord, { Message } from 'discord.js';

class MessageGroup extends React.Component {

  render() {
    /** @type {Message} */
    const message = this.props.message;

    const avatar = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=128`
    let username = message.author.username;
    let color = undefined;

    if (message.member) {
      username = message.member.displayName;
      color = message.member.displayHexColor;
    }

    return (
      <div className="MessageGroup">
        <div className="header">
          <div className="avatar" aria-hidden="true">
            <div className="wrapper" role="img" aria-hidden="true" style={{width: "40px", height: "40px"}}>
              <svg width="49" height="40" viewBox="0 0 49 40" className="mask" aria-hidden="true">
                <foreignObject x="0" y="0" width="40" height="40" mask="url(#svg-mask-avatar-default)">
                  <img src={avatar} alt=" " className="avatar-inner" aria-hidden="true" />
                </foreignObject>
              </svg>
            </div>
          </div>
          <h2 className="headerMeta">
            <span tabindex="0" className="username" role="button" style={{color: color}}>{username}{message.author.bot ? <span className="UsernameTag"> BOT </span> : null}</span>
          </h2>
        </div>
        <div className="content">{message.content}</div>
      </div>
    );
  }
}

export default MessageGroup;
