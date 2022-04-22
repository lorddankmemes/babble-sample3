import React, { Component } from "react";
import Avatar from "./Avatar";

export default class ChatListItems extends Component {
  constructor(props) {
    super(props);
  }
  selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        className={`cursor-pointer flex p-3 ${this.props.active ? this.props.active : ""
          } `}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "http://placehold.it/80x80"
          }
          isOnline={this.props.isOnline}
        />

        <div className="justify-between p-2">
          <p>{this.props.name}</p>
          <span className="text-gray-700 text-xs">32 mins ago</span>
        </div>
      </div>
    );
  }
}