import React, { Component } from 'react'
import { Row, Col, Input, Button, Icon, Upload } from 'antd'
import styled from 'styled-components'
import Chat from './Chat';

const ChatBoxStyled = styled(Col)`
    height: calc(100vh - 90px);
    display: flex;
    margin: 0;
    flex-direction: column;
    justify-content: flex-end;
`;

const ChatListStyled = styled.div`
    overflow-y: auto;
    padding: 0 5px;
`;

const FormStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

export default class ChatBox extends Component {
    render() {
        return (
            <Row style={{ width: '100%' }}>
                <Col span={18}>
                    <div>
                        đây là post
                    </div>
                </Col>
                <ChatBoxStyled span={6}>
                    <ChatListStyled>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                        <Chat you mess='dang lam gi day'/>
                        <Chat mess='dang xem phim'/>
                    </ChatListStyled>
                    <FormStyled>
                        <div >
                            <Input />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Upload>
                                <Button>
                                    <Icon type='upload' />
                                </Button>
                            </Upload>
                            <Button>
                                <Icon type="right-square"/>
                            </Button>
                        </div>
                    </FormStyled>
                </ChatBoxStyled>
            </Row>
        )
    }
}
