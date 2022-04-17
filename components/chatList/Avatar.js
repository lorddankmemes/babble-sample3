import React, { Component } from "react";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="relative w-16 h-16">
        <div className="pr-2">
          <img className="rounded-full border border-gray-100 shadow-sm" src={this.props.image} alt="#" />
          <div className="absolute top-0 right-0 h-4 w-4 my-1 border-2 border-white rounded-full bg-green-400 z-2 "></div>
        </div>
        <span className={`text-gray-800 text-base font-semibold isOnline ${this.props.isOnline}`}></span>
      </div>
    );
  }
}