import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// @inject("rootStore")
// @observer
class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      rootStore: { userStore },
    } = this.props;
    console.log("rerender");
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>{userStore.counter}</p>
          <button onClick={() => userStore.incr()}>Incr</button>
        </header>
      </div>
    );
  }
}

export default inject("rootStore")(observer(Test));
