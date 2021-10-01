import {
  Button,
  Input,
  Modal,
  Table,
  InputNumber,
  Form,
  Popconfirm,
} from "antd";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class Basic extends Component {
  constructor(props) {
    super(props);
    this.actionColumn = {
      key: "action",
      render: (text, record) => {
        const editable = this.isEditing(record.id);
        return (
          <div>
            <Button onClick={() => this.currentStore.setSelectedItem(record)}>
              Sửa
            </Button>
            <Button>Xóa</Button>
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
    
  }

  render() {
    const data = this.currentStore?.data;
    const columns = [...this.columns, this.actionColumn];
    return (
      <div className="base-wrap-management w-full">
        <div className="m-16">
          <Button>Create New</Button>
        </div>
        <div>
          <Table
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(Basic);
