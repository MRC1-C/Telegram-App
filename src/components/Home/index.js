import { Layout, Menu, Typography, Input, Button, Space, Avatar } from 'antd';
import { PureComponent } from 'react';
import Icon, { BellOutlined, TeamOutlined, WechatOutlined, ExperimentOutlined, PlusCircleOutlined} from '@ant-design/icons';
import styled from 'styled-components'
import Room from './Room';

const { Header, Content, Sider } = Layout;

const AvatarIcon = props => <Icon component={Avatar} {...props} />;

const HeaderStyled = styled(Header)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    background-color: white;
    border-bottom: 1px solid #efefef;
`

const ContentStyled = styled(Content)`
    background-color: white;
    height: calc(100vh - 80px);
    padding: 20px 20px 0 20px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const arr = [1,2,3,4,6,7,8,9,10];

export default class Home extends PureComponent {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed});
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: '60px' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} >
            <Menu.Item key="1">
              <BellOutlined/>
              <span> Thông báo</span>
            </Menu.Item>
            <Menu.Item key="2">
              <WechatOutlined/>
              <span> Nhắn tin</span>
            </Menu.Item>
            <Menu.Item key="3">
              <TeamOutlined />
              <span> Bạn bè</span>
            </Menu.Item>
            <Menu.Item key="4">
              <ExperimentOutlined />
              <span> Bình hóa học ??</span>
            </Menu.Item>
            <Menu.Item key="5">
              <AvatarIcon style={{ marginLeft: '-8px', }}>I</AvatarIcon>
              <span> Quân</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <HeaderStyled>
              <Typography.Text strong>Nhóm của bạn</Typography.Text>
              <Space size={10}> 
                  <Typography.Text>Nhập mã nhóm:</Typography.Text>
                  <Input style={{ width: '150px' }}/>
                  <Button type='primary'>Tham gia</Button>
                  <Button icon={<PlusCircleOutlined />}>Tạo nhóm mới</Button>
              </Space>
          </HeaderStyled>
          <ContentStyled>
                    {
                        arr.map(a => 
                            <Room key={a}/>
                        )
                    }

                    {/* <div style={{ width: '660px' }}></div> */}
          </ContentStyled>
        </Layout>
      </Layout>
    );
  }
}