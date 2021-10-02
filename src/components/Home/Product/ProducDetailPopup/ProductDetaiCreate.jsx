import { Input, Form, Empty } from "antd";
import React from "react";
class ProducDetailPopup extends React.Component {
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
        <Form.Item label="Cost">
          <Input
            defaultValue={currentStore.form.cost}
            type="number"
            onChange={(e) => currentStore.setForm("cost", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input
            defaultValue={currentStore.form.quantity}
            type="number"
            onChange={(e) => currentStore.setForm("quantity", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="LocationId">
          <Input
            defaultValue={currentStore.form.locationId}
            type="number"
            onChange={(e) => currentStore.setForm("locationId", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="FamilyId">
          <Input
            defaultValue={currentStore.form.familyId}
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
