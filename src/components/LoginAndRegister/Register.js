import React, { Component } from 'react'
import { Row, Col, Form, Input, Button  } from 'antd'
import styled from 'styled-components'
import { inject, observer } from "mobx-react"
const ButtonStyled = styled(Button)`
    width: 100%;
`;

@inject("rootStore")
@observer
class Register extends Component {
    constructor(props) {
        super(props);
    }
    handleButtonRegister = () => {
        let user = {
            email: this.props.form.getFieldsValue().email,
            password: this.props.form.getFieldsValue().password 
        }
        this.props.rootStore.userStore.setFormFields(user)
        this.props.rootStore.userStore.register()
        console.log(this.props.rootStore.userStore.token)
    }

    handleButtonLogin = () => {
        this.props.setLogin();
    }

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
                            rules: [{ required: true, message: 'Hãy nhập mật khẩu' }],
                        })(
                            <Input type='password' placeholder='Nhập mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('checkpassword', {
                            rules: [{ 
                                        required: true, 
                                        message: 'Hãy xác nhận mật khẩu' 
                                    },
                                    ],
                        })(
                            <Input type='password' placeholder='Xác nhận mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <ButtonStyled htmlType='submit' type='primary' onClick={this.handleButtonRegister}>Đăng ký</ButtonStyled>
                    </Form.Item>
                    <Form.Item>
                        <ButtonStyled type='primary' onClick={this.handleButtonLogin}>Đăng nhập</ButtonStyled>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        )
    }
}

export default Form.create()(Register);
