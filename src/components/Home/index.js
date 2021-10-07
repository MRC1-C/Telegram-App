import { Layout, Menu, Input, Button, Avatar, Icon, Typography, Tabs } from 'antd';
import { Component } from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components'
import Map from '../Map';
import Product from './Product';
import ProductId from './Product/Product_Id';
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
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
    height: calc(100vh - 80px);
    overflow-y: auto; 
    padding: 10px;
    background-color: white;
`

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: true,
      data : [{}]
    }
}

  onCollapse = collapsed => {
    this.setState({ collapsed});
  };

  handleCreateTeam = () => {
    this.props.rootStore.homeStore.isVisibleModalCreateTeam = true;
  }

  handleLogout = () => {
      localStorage.clear();
      this.props.history.push('/login')
  }

  async componentDidMount (){
    this.props.history.push('/products')
  }
  
  
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: '60px' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} >
            <Menu.Item key="2">
              <Icon type="bell" />
              <span> Thông báo</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="wechat" />
              <span> Tin nhắn</span>
            </Menu.Item>
            <Menu.Item key="1">
             <Icon type="team" />
              <span> Nhóm</span>
            </Menu.Item>
            <Menu.Item key="4">
             <Icon type="experiment" />
              <span> Bình hóa học ??</span>
            </Menu.Item>
            <Menu.Item key="5">
              <AvatarIcon style={{ marginLeft: '-8px' }}>I</AvatarIcon>
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
                  <Button icon='plus-circle' onClick={this.handleCreateTeam}>Tạo nhóm mới</Button>
                  <Button icon='logout' onClick={this.handleLogout}></Button>
              </div>
          </HeaderStyled>
          <ContentStyled>
              <Tabs defaultActiveKey="Tab 2" type='line' onChange={(key)=>this.props.history.push(key)}>
                <TabPane tab="Products" key="/products" />
                <TabPane tab="Map" key="/map" />
              </Tabs>
              <div >
                <Switch>
                  <Route component={Product} path='/products' />
                  <Route component={Map} path='/map' />
                  <Route component={ProductId} path='/product/:id' />
                </Switch>
              </div>
          </ContentStyled>
        </Layout>
      </Layout>
    );
  }
}

export default Home;