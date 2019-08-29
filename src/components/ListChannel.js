import React from 'react';
// eslint-disable-next-line
import discord from 'discord.js';
import DiscordIcon from './DiscordIcon';

class ListChannel extends React.Component {

  render() {
    /** @type {discord.GuildChannel} */
    const channel = this.props.channel;
    return (
      <div className="drag">
        <div className={"ListChannel" + (this.props.selected ? " selected" : "")} onClick={this.click.bind(this)}>
          <DiscordIcon channel={channel} />
          <div className="name">{channel.name}</div>
        </div>
      </div>
    );
  }

  click() {
    if (this.props.channel.type === "text" && !this.props.selected)
      window.app.setStateProp("channel", this.props.channel);
  }
}

export default ListChannel;
