import { Button, Modal, Table, Icon } from "antd";
import React, { Component } from "react";

class Basic extends Component {
  constructor(currentStore, props) {
    super(props);
    this.state = {
      visibleCreate: false,
      visibleEdit: false,
    };
    this.currentStore = currentStore;
    this.actionColumn = {
      key: "action",
      render: (text, record) => {
        return (
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <Button type="primary" onClick={() => this.handleEdit(record)}>
              Sửa
            </Button>
            <Button type="primary" onClick={() => this.handleDelete(record.id)}>
              Xóa
            </Button>
          </div>
        );
      },
    };
    this.columns = [
      {
        title: "Id",
        dataIndex: "id",
        editable: true,
      },
      {
        title: "Name",
        dataIndex: "name",
        editable: true,
      },
    ];
  }

  async componentDidMount() {
    await this.currentStore.getData();
  }

  handleEdit(value) {
    this.setState({ visibleEdit: true });
    this.currentStore.setFormEdit(value);
    this.currentStore.setId(value.id);
  }

  async handleOkEdit() {
    this.setState({ visibleEdit: false });
    await this.currentStore.edit();
    await this.currentStore.getData();
  }

  async handleDelete(id) {
    this.currentStore.setId(id);
    await this.currentStore.delete();
    await this.currentStore.getData();
  }
  async handleOKCreate() {
    await this.currentStore.create();
    await this.currentStore.getData();
    this.setState({
      visibleCreate: false,
    });
  }

  renderDetaiCreate() {
    return <div></div>;
  }

  renderDetaiEdit() {
    return <div></div>;
  }

  render() {
    const data = this.currentStore.data;
    const columns = [...this.columns, this.actionColumn];
    return (
      <div className="w-full">
        <div className="m-16">
          <Button
            onClick={() => {
              this.setState({ visibleCreate: true });
              this.currentStore.setFormEdit({
                name: "",
                cost: "",
                quantity: "",
              });
            }}
            type="primary"
          >
            Tạo mới <Icon type="plus-circle" />
          </Button>
        </div>
        <div>
          <Table
            size="small"
            rowKey="id"
            bordered
            dataSource={data}
            columns={columns}
            tableLayout="fixed"
          />
        </div>
        <Modal
          visible={this.state.visibleEdit}
          onOk={() => this.handleOkEdit()}
          onCancel={() => {
            this.setState({ visibleEdit: false });
          }}
        >
          {this.renderDetaiEdit()}
        </Modal>
        <Modal
          visible={this.state.visibleCreate}
          onOk={() => this.handleOKCreate()}
          onCancel={() => {
            this.setState({ visibleCreate: false });
            this.currentStore.setFormEdit({
              name: "",
              cost: "",
              quantity: "",
            });
          }}
        >
          {this.renderDetaiCreate()}
        </Modal>
      </div>
    );
  }
}

export default Basic;
