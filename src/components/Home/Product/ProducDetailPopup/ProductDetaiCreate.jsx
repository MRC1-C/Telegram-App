import { Input, Form, Empty } from "antd";
import { observer } from "mobx-react";
import React from "react";

@observer
class ProducDetailPopup extends React.Component {
  render() {
    const { currentStore } = this.props;
    return currentStore?.form ? (
      <Form>
        <Form.Item label="Name">
          <Input
            value={currentStore.form.name}
            type="text"
            onChange={(e) => currentStore.setForm("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Cost">
          <Input
            value={currentStore.form.cost}
            type="number"
            onChange={(e) => currentStore.setForm("cost", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input
            value={currentStore.form.quantity}
            type="number"
            onChange={(e) => currentStore.setForm("quantity", e.target.value)}
          />
        </Form.Item>
      </Form>
    ) : (
      <Empty />
    );
  }
}
export default ProducDetailPopup;
