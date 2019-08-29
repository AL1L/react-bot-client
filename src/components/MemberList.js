import React from 'react';
// eslint-disable-next-line
import { Role, GuildMember, Guild } from 'discord.js';
import { getUsername } from '../util';

class MemberList extends React.Component {

  /**
   * 
   * @param {GuildMember} member 
   */
  getMember(m) {
    /** @type {GuildMember} */
    const member = m;
    let avatarUrl = member.user.displayAvatarURL;

    if (member.user.avatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=256`;
    }

    const usernameStyle = {};

    if (member.colorRole && member.colorRole.color) {
      usernameStyle.color = member.colorRole.hexColor;
    }

    return (
      <div key={member.id} className={"member" + (member.presence.status === "offline" ? " offline" : "")}>
        <div className="avatarWrapper">
          <div className="avatar" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>
          {member.presence.status !== "offline" ? <div className={"status " + member.presence.status}></div> : null}
        </div>
        <div className="usernameWrapper">
          <div className="nameTag">
            <div className="username" style={usernameStyle}>{getUsername(member)}</div>
            {member.user.bot ? <span className="UsernameTag">BOT</span> : null}
          </div>
          {/* TODO: Playing status */}
        </div>
      </div>
    );
  }

  /**
   * 
   * @param {Role} role 
   */
  getRoleMemberList(role) {
    if (!role.hoist && role.guild.defaultRole.id !== role.id) return;

    const members = [];
    const name = role.guild.defaultRole.id === role.id ? "Online" : role.name;
    const memberCol = role.members.array();

    for (const member of memberCol)
      if (member.presence.status !== "offline")
        if (!member.hoistRole || member.hoistRole.id === role.id)
          members.push(this.getMember(member));

    if (members.length > 0)
      members.unshift(<div key={role.id} className="memberGroup">{name}—{members.length}</div>)

    return members;
  }

  /**
   * 
   * @param {Guild} guild 
   */
  getOfflineMemberList(guild) {
    if (guild.large) return;

    const members = [];

    for (const member of guild.members.array())
      if (member.presence.status === "offline")
        members.push(this.getMember(member));

    if (members.length > 0)
      members.unshift(<div key="offline" className="memberGroup">Offline—{members.length}</div>)

    return members;
  }

  render() {
    /** @type {Guild} */
    const guild = this.props.guild;

    const groups = [];

    for (const role of guild._sortedRoles.array().reverse())
      groups.push(this.getRoleMemberList(role));

    return (
      <div className="MemberList">
        {groups}
        {this.getOfflineMemberList(guild)}
        <div style={{ height: "20px" }}></div>
      </div>
    );
  }
}

export default MemberList;
