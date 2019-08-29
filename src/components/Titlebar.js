import React from 'react';
import logo from '../assets/discord/Discord-Wordmark-White.svg'

class Titlebar extends React.Component {

  render() {
    const style = {};

    if (this.props.loading) {
      style.backgroundColor ="#36393f";
    }

    return (
      <div className="Titlebar" style={style}>
        <div className="resizer top"></div>
        <div className="resizer left"></div>
        <div className="resizer right"></div>
        <img src={logo} className="logo" alt="logo" />
        <div className="control">
          <div className="button minimize">
            <svg name="TitlebarMinimize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
              <rect fill="#ffffff" width="10" height="1" x="1" y="6"></rect>
            </svg>
          </div>
          <div className="button maxamize">
            <svg name="TitleBarMaximize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
              <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#ffffff"></rect>
            </svg>
          </div>
          <div className="button close">
            <svg name="TitleBarClose" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
              <polygon fill="#ffffff" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default Titlebar;
