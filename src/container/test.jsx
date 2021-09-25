import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Spin } from "antd";

@inject("rootStore")
@observer
class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      rootStore: { userStore },
    } = this.props;
    return (
      <div className="App">
        {userStore.token && <div>Token của bạn là: {userStore.token}</div>}
        <div>
          <input
            type="text"
            onChange={(e) =>
              userStore.setFormFields("email", e.target.value)
            }
          />
          <input
            type="text"
            onChange={(e) =>
              userStore.setFormFields("password", e.target.value)
            }
          />
        </div>
        {userStore.loading && <Spin spinning />}
        <div>
          <button onClick={async () => await userStore.login()}>login</button>
        </div>
      </div>
    );
  }
}

export default Test;
