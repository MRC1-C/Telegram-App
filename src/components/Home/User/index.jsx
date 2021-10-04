import { inject, observer } from "mobx-react";
import Basic from "../../Demo/Basic";
import UserInfoDetailCreate from "./UserInfoDetailPopup/UserInfoDetaiCreate";

@inject("rootStore")
@observer
class UserInfo extends Basic {
  constructor(props) {
    super(props.rootStore.userInfoStore, props);
    this.columns = [
      {
        key: "id",
        title: "Id",
        dataIndex: "id",
        editable: true,
      },
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        editable: true,
      },
    ];
  }

  renderDetaiCreate() {
    return <UserInfoDetailCreate currentStore={this.currentStore} />;
  }

  renderDetaiEdit() {
    return <UserInfoDetailCreate currentStore={this.currentStore} />;
  }

  render() {
    return super.render();
  }
}

export default UserInfo;
