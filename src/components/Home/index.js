import { Layout, Menu, Input, Button, Avatar, Icon, Typography } from 'antd';
import { Component } from 'react';
import styled from 'styled-components'
import Room from './Room';
import { inject, observer } from "mobx-react"

const { Header, Content, Sider } = Layout;

const AvatarIcon = props => <Icon component={Avatar} {...props} />;

const HeaderStyled = styled(Header)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    background-color: white;
    border-bottom: 1px solid #efefef;
    .headerRight {
      display : inline-flex;
      align-items: center;
      gap: 10px;
    }
`

const ContentStyled = styled(Content)`
    background-color: white;
    height: calc(100vh - 80px);
    overflow-y: auto; 
    padding: 20px 70px;
`

const RoomListStyled = styled.div`
  display: flex;
  flex-flow: row wrap;  
  gap: 16px 20px;
`

const arr = [1,2,3,4,6,7,8,9,10];

@inject("rootStore")
@observer
class Home extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed});
  };

  handleCreateTeam = () => {
    this.props.rootStore.homeStore.isVisibleModalCreateTeam = true;
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: '60px' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} >
            <Menu.Item key="1">
              <Icon type="bell" />
              <span> Thông báo</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="wechat" />
              <span> Nhắn tin</span>
            </Menu.Item>
            <Menu.Item key="3">
             <Icon type="team" />
              <span> Bạn bè</span>
            </Menu.Item>
            <Menu.Item key="4">
             <Icon type="experiment" />
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
              <div className='headerRight'> 
                  <Typography>Nhập mã nhóm:</Typography>
                  <Input style={{ width: '150px' }}/>
                  <Button type='primary'>Tham gia</Button>
                  <Button icon={<Icon type="plus-circle" />} onClick={this.handleCreateTeam}>Tạo nhóm mới</Button>
              </div>
          </HeaderStyled>
          <ContentStyled>
              <RoomListStyled>
                    {
                        arr.map(a => 
                            <Room key={a}/>
                        )
                    }
              </RoomListStyled>
          </ContentStyled>
        </Layout>
      </Layout>
    );
  }
}

export default Home;