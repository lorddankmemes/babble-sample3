import React, { Component } from "react";
// import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`flex justify-start ${this.props.user ? this.props.user : ""}`}
      >
        <div className="flex flex-col space-y-5 text-left">
          <div className="bg-gray-100 text-gray-900 p-5 text-base rounded-r-lg rounded-b-lg inline flex max-w-xl">{this.props.msg}</div>
          {/* <div className="text-slate-500 space-x-1">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div> */}
        </div>
        {/* <Avatar isOnline="active" image={this.props.image} /> */}
      </div>
    );
  }
}