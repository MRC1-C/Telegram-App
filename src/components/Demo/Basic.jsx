import { Button, Modal, Table } from "antd";
import React, { Component } from "react";

class Basic extends Component {
  constructor(currentStore, props) {
    super(props);
    this.currentStore = currentStore;
    this.actionColumn = {
      key: "action",
      render: (text, record) => {
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
    await this.currentStore.getData();
  }
  renderDetailData() {
    return <div>

    </div>
  }
  render() {
    const data = this.currentStore.data;
    const columns = [...this.columns, this.actionColumn];
    return (
      <div className="base-wrap-management w-full">
        <Modal
          visible={this.currentStore.selectedItem ? true : false}
        >
          {this.renderDetailData()}
        </Modal>
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

export default Basic;
