import React from 'react';
// eslint-disable-next-line
import discord from 'discord.js';
import ListChannel from './ListChannel';

class ListChannelCategory extends React.Component {

  render() {
    /** @type {discord.CategoryChannel} */
    const channel = this.props.channel;
    const currentChannel = this.props.current;
    const canView = this.props.canView;

    const channels = [];

    for (const c of channel.children.sort((a, b) => a.calculatedPosition > b.calculatedPosition).filter(c => c.type === "text" && canView(c)).array()) {
      channels.push(<ListChannel key={c.id} channel={c} selected={currentChannel.id === c.id} />);
    }

    for (const c of channel.children.sort((a, b) => a.calculatedPosition > b.calculatedPosition).filter(c => c.type === "voice" && canView(c)).array()) {
      channels.push(<ListChannel key={c.id} channel={c} selected={currentChannel.id === c.id} />);
    }

    return [
      <div key={channel.id} className="drag">
        <div className="ListChannelCategory">
          <div className="name">{channel.name}</div>
        </div>
      </div>,
      ...channels
    ];
  }
}

export default ListChannelCategory;
