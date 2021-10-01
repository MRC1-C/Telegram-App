import {
  Button,
  Input,
  Modal,
  Table,
  InputNumber,
  Form,
  Popconfirm,
  Empty,
} from "antd";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@observer
@inject("rootStore")
class ProducDetailPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentStore } = this.props;
    return currentStore?.selectedItem ? (
      <Form>
        <Form.Item label="name">
          <Input
            value={currentStore?.selectedItem?.name}
            onChange={(e) =>
              this.currentStore.setFormFields("name", e.target.value)
            }
          />
        </Form.Item>
      </Form>
    ) : (
      <Empty />
    );
  }
}
export default ProducDetailPopup;
