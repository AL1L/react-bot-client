import React from 'react';
import './assets/App.scss';
import Titlebar from './components/Titlebar';
import Guilds from './components/Guilds';
import Channels from './components/Channels';
import Channel from './components/Channel';
import { Client } from "discord.js";
import { connect } from 'react-redux'

const client = new Client();

window.client = client;
window.isElectron = !!window.require

class App extends React.Component {
  state = {
    loading: true,
    guild: null,
    channel: null
  }

  constructor(...args) {
    super(...args);

    window.app = this;

    client.on("ready", () => {
      const guild = client.guilds.get("267529399656513538");
      const channel = guild.channels.get("387003203105062913");
      this.setState({ ...this.state, guild, channel, loading: false });
    });

    client.on("guildUpdate", guild => {
      if (guild.id === this.state.guild.id) {
        this.setStateProp("guild", guild);
      }
    });

    client.on("channelUpdate", (old, channel) => {
      if (channel.id === this.state.channel.id) {
        this.setStateProp("channel", channel);
      } else if (channel.guild.id === this.state.guild.id) {
        this.forceUpdate();
      }
    });

    client.on("guildMemberUpdate", (old, member) => {
      if (member.guild.id === this.state.guild.id || member.id === client.user.id) {
        this.forceUpdate();
      }
    });

    client.on("presenceUpdate", (old, member) => {
      if (member.guild.id === this.state.guild.id || member.id === client.user.id) {
        this.forceUpdate();
      }
    })

    client.on("roleUpdate", (old, role) => {
      if (role.guild.id === this.state.guild.id && role.guild.me.roles.has(role.id)) {
        this.forceUpdate();
      }
    });

    client.on("message", message => {
      if (message.channel.id === this.state.channel.id) {
        this.forceUpdate();
      }
    });

    client.login(this.props.token);
  }

  setStateProp(key, value) {
    const newState = { ...this.state };
    newState[key] = value;
    return this.setState(newState);
  }

  render() {
    const wrapperStyle = this.state.loading ? { display: "none" } : {};

    return (
      <div className="App">
        {window.isElectron ? <Titlebar client={client} loading={this.state.loading} /> : null}
        {!this.state.loading ? <div className={"AppWrapper" + (window.isElectron ? " electron" : "")} style={wrapperStyle}>
          <Guilds client={client} />
          <Channels client={client} guild={this.state.guild} channel={this.state.channel} />
          <Channel client={client} channel={this.state.channel} />
        </div> : null}
      </div>
    );
  }
}

export default connect((state, props) => { return { token: state.token } })(App);
