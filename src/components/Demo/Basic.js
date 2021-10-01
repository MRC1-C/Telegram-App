import { Button, Input, Modal, Table, InputNumber, Form, Popconfirm } from 'antd'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

const EditableContext = React.createContext();
class EditableCell extends React.Component {
  getInput = () => {
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


@inject("rootStore")
@observer
class Basic extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    editable: true,
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    editable: true,
                },
                {
                    key: 'action',
                    render: (text, record) => {
                      console.log('day la 2')
                      const editable = this.isEditing(record.id);
                        return <div>
                        {editable ? (
                        <span>
                        <EditableContext.Consumer>
                            {form => (
                            <Button
                                onClick={() => this.save(form)}
                                style={{ marginRight: 8 }}
                            >
                                Lưu
                            </Button>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm title="Chắc không ??" onConfirm={() => this.cancel(record.id)}>
                            <Button>Hủy</Button>
                        </Popconfirm>
                        </span>
                        ) : (
                            <Button type='primary'  onClick={() => this.edit(record.id)}>
                                Sửa
                            </Button>
                        )}
                            <Button type='primary' onClick={() => this.handleDelete(record.id)}>Xóa</Button>
                        </div>
                      },
                    }
                ],
                data: [{}],
                visible: false,
            }
        }
        
    async componentDidMount(){
        if(!localStorage.getItem('accessToken')){
            this.props.rootStore.history.push('/login')
          }
        let dt = await this.props.rootStore.demoStore.product();
        let k = [];
        dt.map(data => {
            let {id, name} = data;
            return k.push({id, name})
        })
        this.setState({
            data: k
        })
    } 
    isEditing = id => id == this.props.rootStore.demoStore.id
    cancel = () => {
        this.props.rootStore.demoStore.setId('')
        this.componentDidMount()
    };
    
    save(form) {
        form.validateFields(async (error, row) => {
            if (error) {
              return;
            }
            this.props.rootStore.demoStore.setDataEdit(row)
            console.log(this.props.rootStore.demoStore.dataEdit)  
            await this.props.rootStore.demoStore.edit()
            this.props.rootStore.demoStore.setId('')
            await this.componentDidMount()
        });
    }
    
    edit(id) {
        this.props.rootStore.demoStore.setId(id)
        this.componentDidMount()
    }


    async handleDelete(id){ 
        this.props.rootStore.demoStore.setId(id)
        await this.props.rootStore.demoStore.delete()
        await this.componentDidMount()
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.rootStore.history.push('/login')
    }

    handleCreate(){
        this.setState({
            visible: true
        })
    }

    handleCancel(){
        this.props.rootStore.demoStore.setName('')
        this.setState({
            visible: false
        })
    }

    async handleOk(){
        await this.props.rootStore.demoStore.create()
        await this.componentDidMount()
        this.props.rootStore.demoStore.setName('')
        this.setState({
            visible: false
        })
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
         const { columns, data, visible } = this.state;
          const columns1 = columns.map(col => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record.id),
              }),
            };
          });
        return (
            <div style={{ width: '100%', height: '300px' }}>
                <div style={{ margin: '10px' }}>
                    <Button onClick={this.handleCreate.bind(this)}>Create New</Button>
                    <Button onClick={this.handleLogout}>Logout</Button>
                </div>
                <div>
                  {console.log('day la 1')}
                <EditableContext.Provider value={this.props.form}>
                    <Table
                    components={components}
                    bordered
                    dataSource={data}
                    columns={columns1}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    />
                </EditableContext.Provider>
                </div>
                <Modal
                    visible={visible}
                    title="Creat New"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>
                        Hủy
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                        Tạo
                        </Button>,
                    ]}
                >
                    <Input value={this.props.rootStore.demoStore.name} onChange={(e) => {this.props.rootStore.demoStore.setName(e.target.value) }} />    
                </Modal>
            </div>
        )
    }
}

export default Form.create()(Basic);