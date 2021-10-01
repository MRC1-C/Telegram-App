import React, { Component } from 'react'
import { Row, Col, Form, Input, Button  } from 'antd'
import { inject, observer } from "mobx-react"
@inject("rootStore")
@observer
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
    }
    handleButtonRegister = () => {
        let user = {
            email: this.props.form.getFieldsValue().email,
            password: this.props.form.getFieldsValue().password 
        }
        this.props.rootStore.userStore.setFormFields(user)
        this.props.rootStore.userStore.register()
    }

    handleButtonLogin = () => {
        this.props.setLogin();
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Hai mật khẩu không khớp');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['checkpassword'], { force: true });
        }
        callback();
      };

    render() {
        const {
            form: { getFieldDecorator}
          } = this.props;
        return (
            <Row style={{ paddingTop: '-150px'}}>
            <Col span={8} offset={8} style={{ padding: '20px' ,border: '1px solid lightgray', borderRadius: '5px', display: this.props.isRegister?'inline':'none'}}>
                <Form layout='vertical'>
                    <Form.Item>
                        <h1>Telegram App</h1>
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Đây không phải là email',
                                  },
                                { 
                                    required: true, 
                                    message: 'Hãy nhập email' 
                                }],
                    })(
                            <Input placeholder='Nhập email'/>
                    )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{ 
                                        required: true, 
                                        message: 'Hãy nhập mật khẩu' 
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                    ],
                        })(
                            <Input.Password placeholder='Nhập mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('checkpassword', {
                            rules: [{ 
                                        required: true, 
                                        message: 'Hãy xác nhận mật khẩu' 
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                    ],
                        })(
                            <Input.Password placeholder='Xác nhận mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' onClick={this.handleButtonRegister} block>Đăng ký</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={this.handleButtonLogin} block>Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        )
    }
}

export default Form.create()(Register);
