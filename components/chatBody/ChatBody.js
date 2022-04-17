import React, { Component } from 'react';
import ChatContent from '../chatContent/ChatContent';
import ChatList from '../chatList/ChatList';

export default class ChatBody extends Component {
  render() {
    return (
      <div className='max-h-full h-full flex flex-row'>
        <aside className='w-full lg:w-2/6 bg-white rounded-lg mr-5'>
          <div className='max-w-full h-full w-full flex flex-col'>
            <div className='flex p-10 justify-between'>
              <ChatList />
            </div>
          </div>
        </aside>
        <section className='relative max-h-full bg-white rounded-lg w-full flex flex-col lg:flex hidden'>
          <ChatContent />
        </section>
      </div>
    )
  }
}
