import React, { Component } from 'react'
import { Row, Col, Form, Input, Button  } from 'antd'
import styled from 'styled-components'
import { inject, observer } from "mobx-react"

const ButtonStyled = styled(Button)`
    width: 100%;
`;
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
        console.log(this.props.rootStore.userStore.token)
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
                            <Input type='password' placeholder='Nhập mật khẩu' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <ButtonStyled htmlType='submit' type='primary' onClick={this.handleButtonLogin}>Đăng nhập</ButtonStyled>
                    </Form.Item>
                    <Form.Item>
                        <ButtonStyled type='primary' onClick={this.handleButtonRegister} block>Đăng ký</ButtonStyled>
                    </Form.Item>
                </Form>
            </Col>
        </Row> 
            
        )
    }
}

export default Form.create()(Login);