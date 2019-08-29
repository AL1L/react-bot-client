import React from 'react';
import ListChannelCategory from './ListChannelCategory';
// eslint-disable-next-line
import discord, { Permissions } from 'discord.js';
import CurrentUser from './CurrentUser';
import ListChannel from './ListChannel';
import DiscordIcon from './DiscordIcon';

/**
 * 
 * @param {discord.GuildChannel} channel 
 * @param {discord.Client} client 
 */
function canView(channel) {
  const myPerms = channel.permissionsFor(channel.guild.me);

  if (channel.type === "category") {
    for (let c of channel.children.array())
      if (canView(c)) return true;

    if (myPerms.has(Permissions.FLAGS.VIEW_CHANNEL)) return true;
  } else if (myPerms.has(Permissions.FLAGS.VIEW_CHANNEL)) {
    return true;
  }

  return false;
}

class Channels extends React.Component {
  state = {
    headerOpen: false
  }

  render() {
    /** @type {discord.Client} */
    const client = this.props.client;
    /** @type {discord.Guild} */
    const guild = this.props.guild;
    const currentChannel = this.props.channel;
    const firstCategory = guild._sortedChannels().find(c => c.type === "category");

    const channelList = [];

    for (let channel of guild.channels.filter(c => !c.parentID && c.type !== "category" &&
      c.calculatedPosition <= firstCategory.calculatedPosition && canView(c))
      .sort((a, b) => a.calculatedPosition > b.calculatedPosition).array()) {
      channelList.push(<ListChannel key={channel.id} channel={channel} selected={currentChannel.id === channel.id} />)
    }

    const lastChannel = channelList[channelList.length - 1];

    for (let channel of guild._sortedChannels().filter(c => c.type === "category" && canView(c)).array()) {
      channelList.push(<ListChannelCategory key={channel.id} channel={channel} current={currentChannel} canView={canView} />)
    }

    if (lastChannel) {
      for (let channel of guild.channels.filter(c => !c.parentID && c.type !== "category" &&
        c.calculatedPosition > lastChannel.calculatedPosition && canView(c))
        .sort((a, b) => a.calculatedPosition > b.calculatedPosition).array()) {
        channelList.push(<ListChannel key={channel.id} channel={channel} selected={currentChannel.id === channel.id} />)
      }
    }

    return (
      <div className="Channels">
        <div className={"header" + (this.state.headerOpen ? " open" : "")} onClick={this.toggleHeader.bind(this)}>
          <div className="name">{guild.name}</div>
          <DiscordIcon icon={DiscordIcon.icons.DROPDOWN} size="18" />
        </div>
        <div className="list">
          <div style={{ height: lastChannel ? "16px" : "0" }}></div>
          {channelList}
          <div style={{ height: "16px" }}></div>
        </div>
        <CurrentUser user={client.user} />
      </div>
    );
  }

  toggleHeader() {
    this.setState({ ...this.state, headerOpen: !this.state.headerOpen })
  }
}

export default Channels;
