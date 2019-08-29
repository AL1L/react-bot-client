import React from 'react';
import { connect } from 'react-redux'
import { setChannelDraft } from '../actions'
// eslint-disable-next-line
import discord, { TextChannel } from 'discord.js';

class ChatInput extends React.Component {

  render() {
    const channel = this.props.channel;
    const lineCount = this.props.draft.split("\n").length;

    const startingStyle = {
      height: (1.3 * lineCount) + "em"
    };

    return (
      <form className="ChatInput">
        <div className="textArea">
          <div className="inner">
            <div className="upload"></div>
            <textarea style={startingStyle} placeholder={"Message #" + channel.name} onKeyPress={this.keyPress.bind(this)} onChange={this.update.bind(this)} value={this.props.draft}></textarea>
            <div className="buttons"></div>
          </div>
        </div>
      </form>
    );
  }

  update(event) {
    /** @type {TextChannel} */
    // const channel = this.props.channel;

    // TODO: Bugged
    // if (!channel.typing && event.target.value.length > 3) channel.startTyping();

    const lineCount = event.target.value.split("\n").length;

    event.target.style.height = (1.3 * lineCount) + "em";

    this.props.setChannelDraft(this.props.channel, event.target.value);
  }

  /**
   * 
   * @param {React.KeyboardEvent} event 
   */
  keyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (event.ctrlKey || !event.target.value) return;

      /** @type {TextChannel} */
      const channel = this.props.channel;

      // if (channel.typing) channel.stopTyping();

      channel.send(event.target.value);

      event.target.value = "";
      event.target.style.height = "1.3em";
      
      this.props.setChannelDraft(this.props.channel, "");
    } else {
      this.update(event);
    }
  }
}

export default connect((state, props) => ({ draft: state.drafts[props.channel.id] || "" }),
  (dispatch, props) => ({ setChannelDraft: (c, v) => dispatch(setChannelDraft(c, v)) }))(ChatInput);
