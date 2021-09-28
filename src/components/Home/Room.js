import { Button, Card, Icon } from 'antd'
import React, {Component } from 'react'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
    border: none;
    background-color: #fafafa;
    border-radius: 2px;
    &:hover{
        background-color: #1890ff;
        i {
            color: white;
        }
    }
`;

const CardStyled = styled(Card)`
    .ant-card-actions li {
        margin: 0;
    }
`;

const { Meta } = Card

export default class Room extends Component {
    render() {
        return (
            <CardStyled
                hoverable
                style={{ width: '300px' }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <ButtonStyled block><Icon type="plus-circle" /></ButtonStyled>,
                    <ButtonStyled block><Icon type="forward" /></ButtonStyled>,
                    <ButtonStyled block><Icon type="logout" /></ButtonStyled>
                ]}
             >
                <Meta
                title="Card title"
                />
            </CardStyled>
            )
    }
}
