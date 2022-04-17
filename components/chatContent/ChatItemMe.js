import React, { Component } from "react";

export default class ChatItemMe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`lex justify-end ${this.props.user ? this.props.user : ""}`}
      >
        <div className="space-y-5 text-right">
          <div className="bg-indigo-800 text-white p-5 text-base rounded-l-lg rounded-b-lg inline-block max-w-xl">{this.props.msg}</div>
          {/* <div className="text-slate-500 space-x-4">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div> */}
        </div>
      </div>
    );
  }
}