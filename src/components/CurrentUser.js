import React from 'react';
import DiscordIcon from './DiscordIcon';

class CurrentUser extends React.Component {

  render() {
    const user = this.props.user;

    return (
      <div className="CurrentUser">
        <div className="avatarWrapper">
          <div className="avatar" style={{ backgroundImage: `url("${user.avatarURL}")` }}></div>
          <div className={"status " + user.presence.status}></div>
        </div>
        <div className="usernameWrapper">
          <div className="username">{user.username}</div>
          <div className="discriminator">#{user.discriminator}{user.bot ? <span className="UsernameTag"> BOT </span> : null}</div>
        </div>
        <div className="iconWrapper">
          <DiscordIcon icon={DiscordIcon.icons.MIC} />
        </div>
        <div className="iconWrapper">
          <DiscordIcon icon={DiscordIcon.icons.HEADPHONE} />
        </div>
        <div className="iconWrapper">
          <DiscordIcon icon={DiscordIcon.icons.COG} />
        </div>
      </div>
    );
  }
}

export default CurrentUser;
