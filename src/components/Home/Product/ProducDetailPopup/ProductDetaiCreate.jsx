import { Input, Form, Empty } from "antd";
import { observer, inject } from "mobx-react";
import React from "react";

@inject("rootStore")
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
        <Form.Item label="LocationId">
          <Input
            value={currentStore.form.locationId}
            type="number"
            onChange={(e) => currentStore.setForm("locationId", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="FamilyId">
          <Input
            value={currentStore.form.familyId}
            type="number"
            onChange={(e) => currentStore.setForm("familyId", e.target.value)}
          />
        </Form.Item>
      </Form>
    ) : (
      <Empty />
    );
  }
}
export default ProducDetailPopup;
