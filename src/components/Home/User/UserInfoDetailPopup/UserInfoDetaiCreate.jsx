import { Input, Form, Empty } from "antd";
import React from "react";
class UserInfoDetailCreate extends React.Component {
  render() {
    const { currentStore } = this.props;
    return currentStore ? (
      <Form>
        <Form.Item label="Name">
          <Input
            defaultValue={currentStore.form.name}
            type="text"
            onChange={(e) => currentStore.setForm("name", e.target.value)}
          />
        </Form.Item>
      </Form>
    ) : (
      <Empty />
    );
  }
}
export default UserInfoDetailCreate;
