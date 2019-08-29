import React from 'react';
import DiscordIcon from './DiscordIcon';
import MemberList from './MemberList';
import Chat from './Chat';
import { connect } from 'react-redux'
import { toggleMemberList } from '../actions'

class Channel extends React.Component {

  render() {

    const channel = this.props.channel;
    const showMembers = this.props.showMembers ? " selected" : "";

    return (
      <div className="Channel">
        <div className="header">
          <div className="hash">
            <DiscordIcon channel={channel} />
          </div>
          <div className="title">{channel.name}</div>
          {channel.topic ? (<div className="divider"></div>) : null}
          <div className="topic">{channel.topic}</div>
          <div className="iconWrapper">
            <DiscordIcon icon={DiscordIcon.icons.PIN} />
          </div>
          <div className={"iconWrapper" + showMembers} onClick={this.props.toggleMemberList}>
            <DiscordIcon icon={DiscordIcon.icons.MEMBERS} />
          </div>
        </div>
        <div className="chatWrapper">
          <Chat channel={channel} />
          {showMembers ? (<MemberList guild={channel.guild} />) : null}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({ showMembers: state.showMembers }),
  (dispatch, props) => ({ toggleMemberList: () => dispatch(toggleMemberList()) }))(Channel);
