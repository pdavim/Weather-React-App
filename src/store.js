import React from "react";

import { EventEmitter } from "events";

export default class StorePattern extends React.Component {
  constructor(props) {
    super(props);

    this.eventEmitter = new EventEmitter();

    //Main App State
    this.state = {
      appName: "Weather Up",
      author: "Pedro Davim"
    };
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...this.state,
        eventEmitter: this.eventEmitter
      });
    });
  }
}
