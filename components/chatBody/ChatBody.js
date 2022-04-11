import React, { Component } from 'react';
import ChatContent from '../chatContent/ChatContent';
import ChatList from '../chatList/ChatList';
import UserProfile from '../userProfile/UserProfile';

export default class ChatBody extends Component {
  render() {
    return (
      <div>
          <ChatList />
          <ChatContent />
          <UserProfile />
      </div>
    )
  }
}
