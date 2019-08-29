import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import './assets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function loadFromLS(key, def) {
  if (!window.localStorage[key]) {
    window.localStorage[key] = JSON.stringify(def);
    return def
  }

  return JSON.parse(window.localStorage[key])
}

const initialState = {
  channel: null,
  guild: null,
  drafts: loadFromLS("drafts", {}),
  showMembers: loadFromLS("showMembers", true),
  token: loadFromLS("token")
}

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case "SET_CHANNEL_DRAFT":
      if (!action.text) action.text = undefined;
      const newState = {
        ...state,
        drafts: {
          ...state.drafts,
          [action.id]: action.text
        }
      };
      window.localStorage.drafts = JSON.stringify(newState.drafts);
      return newState;
    case "TOGGLE_MEMBER_LIST":
      window.localStorage.showMembers = JSON.stringify(!state.showMembers);
      return {
        ...state,
        showMembers: !state.showMembers
      }
    default:
      return state
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
