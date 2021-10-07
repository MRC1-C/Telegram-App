import { Button, Modal, Table, Icon, Popconfirm, Popover } from "antd";
import React, { Component } from "react";
import styled from "styled-components";

const ButtonDeleteStyled = styled(Button)`
  &:hover {
    background-color: #ff3945;
    opacity: 0.8;
  }
`;
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
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                this.handleEdit(record);
              }}
            >
              <Icon type="edit" />
            </Button>
            <Popconfirm
              title="Are you sure ?"
              onConfirm={(e) => {
                e.stopPropagation();
                this.handleDelete(record.id);
              }}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
              onClick={(e) => e.stopPropagation()}
            >
              <ButtonDeleteStyled className="bg-red border-0" type="primary">
                <Icon type="delete" />
              </ButtonDeleteStyled>
            </Popconfirm>
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
    if (!localStorage.getItem("accessToken")) {
      this.props.history.push("/login");
    }
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
                locationId: "",
                familyId: "",
                detail: {
                  short_description: "",
                  description: "",
                },
                producer: [
                  {
                    key: "1",
                    title: "Tab1",
                    name: "",
                    locationLat: "",
                    locationLong: "",
                  },
                ],
              });
            }}
            type="primary"
          >
            Create <Icon type="plus-circle" />
          </Button>
        </div>
        <div>
          <Table
            style={{
              border: "1px solid #0d5cb6",
              borderRadius: "2px",
            }}
            scroll={{ y: "calc(100vh - 350px)" }}
            rowKey="id"
            bordered
            dataSource={data}
            columns={columns}
            tableLayout="fixed"
            loading={!data}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  this.currentStore.setFormEdit(record);
                  this.props.history.push(`/product/${record.id}`);
                },
                onMouseEnter: (e) => {
                  <Popover>
                    <div>quan</div>
                  </Popover>;
                }, // mouse enter row
              };
            }}
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
              locationId: "",
              familyId: "",
              detail: {
                short_description: "",
                description: "",
              },
              producer: [
                {
                  key: "1",
                  title: "Tab1",
                  name: "",
                  locationLat: "",
                  locationLong: "",
                },
              ],
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
