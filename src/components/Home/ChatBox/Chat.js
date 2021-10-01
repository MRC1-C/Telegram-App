import { Avatar, Typography } from 'antd'
import React, { Component } from 'react'
import styled from 'styled-components'

const ChatStyled = styled.div`
    display: flex;
    gap: 10px;
    margin: 5px 0;
    flex-direction: ${ props => props.you ? 'row-reverse' : 'row' };
`;

const MessageStyled = styled.div`
    background-color: #e5f2ff;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 5px 10px;
    background-color: ${ props => props.you ? '#e5f2ff': 'white'};
    .date {
        font-size: 10px;
    }
`;

export default class Chat extends Component {
    render() {
        return (
            <ChatStyled {...this.props}>
                <Avatar>Q</Avatar>
                <MessageStyled {...this.props}>
                    <Typography.Text>{this.props.mess}</Typography.Text>
                    <Typography.Text type='secondary' className='date'>12:30 06 May 2019</Typography.Text>
                </MessageStyled>
            </ChatStyled>
        )
    }
}
