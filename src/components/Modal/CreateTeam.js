import { Component } from 'react';
import { Modal, Button, Form, Input, Tag, Icon } from 'antd';
import { inject, observer } from "mobx-react"

@inject("rootStore")
@observer
class CreateTeam extends Component {
  handleOk = e => {
    this.props.rootStore.homeStore.isVisibleModalCreateTeam = false;
  };

  handleCancel = e => {
    this.props.rootStore.homeStore.isVisibleModalCreateTeam = false;
  };

  render() {
    return (
      <div>
        <Modal
          visible={this.props.rootStore.homeStore.isVisibleModalCreateTeam}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Xác nhận
            </Button>,
          ]}
        >
          <Form>
              <Form.Item label='Tên nhóm'>
                    <Input />
              </Form.Item>
              <Form.Item label='Mô tả'>
                    <Input.TextArea />
              </Form.Item>
              <Form.Item label='Thành viên'>
                    <Tag><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Bạn(Chủ sở hữu)</Tag>
                    <Tag closable>abc</Tag>
              </Form.Item>
              <Form.Item label='Thêm thành viên'>
                    <Input />
              </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default CreateTeam;