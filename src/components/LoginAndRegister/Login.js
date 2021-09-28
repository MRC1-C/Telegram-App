import React, { Component } from 'react'
import { Row, Col, Form, Input, Button  } from 'antd'
import { inject, observer } from "mobx-react"
import { withRouter } from 'react-router';
@inject("rootStore")
@observer
class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleButtonLogin = () => {
        let user = this.props.form.getFieldsValue()
        this.props.rootStore.userStore.setFormFields(user)
        this.props.rootStore.userStore.login()
        if(this.props.rootStore.userStore.isLogin){
            this.props.history.push('./')
        }
    }

    handleButtonRegister = () => {
        this.props.setLogin();
    }

    render() {
        const {
            form: { getFieldDecorator}
          } = this.props;
        return (
            <Row style={{ paddingTop: '150px'}}>
            <Col span={8} offset={8} style={{ padding: '20px' ,border: '1px solid lightgray', borderRadius: '5px', display: this.props.isLogin?'inline':'none' }}>
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
                            rules: [{ required: true, message: 'Hãy nhập mật khẩu' }],
                        })(
                            <Input.Password placeholder='Nhập mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' onClick={this.handleButtonLogin} block>Đăng nhập</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={this.handleButtonRegister} block>Đăng ký</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row> 
            
        )
    }
}

export default withRouter(Form.create()(Login));