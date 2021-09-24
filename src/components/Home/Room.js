import { Card } from 'antd'
import React, { PureComponent } from 'react'
import { PlusCircleOutlined, ForwardOutlined, LogoutOutlined } from '@ant-design/icons'

const { Meta } = Card

export default class Room extends PureComponent {
    render() {
        return (
            <Card
                style={{ width: '300px', height: '300px' , marginBottom: '20px' }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <PlusCircleOutlined key="add" href='https://www.youtube.com/watch?v=G6mL3t3QzLw' />,
                    <ForwardOutlined key="access" />,
                    <LogoutOutlined key="Logout" />,
                ]}
             >
                <Meta
                title="Card title"
                />
            </Card>
            )
    }
}
