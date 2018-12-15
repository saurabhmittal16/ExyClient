import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Layout, Menu, Popover } from 'antd';
import Router from './Router';

import { removeCurrentUser } from '../actions/authAction';

const {Content, Sider} = Layout;
const sider = [
    ["dashboard", "/", "Dashboard"],
    ["file-done", "/", "Albums"],
    ["wifi", "/", "Surveys"],
    ["user", "/", "Profile"],
]

const NavBar = () => (
    <Menu
        mode="horizontal"
        className="navbar"
    >
        <Menu.Item key="1">
            <Link to="/survey/new">
                <Icon type="plus" />Create
            </Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="loading-3-quarters" />Pending Approval
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="file-done" />Ready To Publish
        </Menu.Item>
        <Menu.Item key="4">
            <Icon type="rocket" />Published
        </Menu.Item>
        <Menu.Item key="5">
            <Icon type="stop" />Discarded
        </Menu.Item>
    </Menu>
);

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            data: undefined,
            name: '',
            image: ''
        };
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.clear();
        this.props.dispatch(removeCurrentUser());
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    getCurrentSider() {
        const currPath = this.props.history.location.pathname;
        const res = sider.find(
            item => item[1] === currPath
        );
        return `${sider.indexOf(res)+1}`;
    }

    render() {
        
        return (
            <Layout className={'admin-panel'} style={{minHeight: '100vh'}}>
                <div className='admin_header'>
                    <span className='text_logo'>
                        EXXY
                    </span>
                    <div className="container_header">
                        <div className="icons">
                            <Popover
                                placement="bottomRight"
                                arrowPointAtCenter
                                style={{padding: 0}}
                                trigger={['click']}
                                content={
                                    <div style={{cursor: 'pointer'}} onClick={this.logout}>
                                        Logout
                                    </div>
                                }
                            >
                                <img 
                                    src="https://cdn2.iconfinder.com/data/icons/social-media-8/512/Chrome.png" 
                                    className="photo__avatar" 
                                    style={{cursor: 'pointer'}}
                                    alt="logo"
                                />
                            </Popover>
                        </div>
                    </div>
                </div>

                <Layout>
                    <Sider
                        collapsed={true}
                        onCollapse={this.onCollapse}
                        breakpoint="lg"
                        collapsedWidth="85"
                        width={200}
                        style={{backgroundColor: '#0278bde7'}}
                    >
                        <Menu 
                            theme="dark" 
                            mode="inline" 
                            defaultSelectedKeys={[this.getCurrentSider()]}
                            style={{width: '85px', marginTop: '5px'}}
                        >
                        {
                            sider.map(
                                (item, index) => (
                                    <Menu.Item 
                                        key={index+1}
                                        title={item[2]}
                                    >
                                        <Link to={item[1]}>
                                            <Icon type={item[0]} theme="outlined" />
                                        </Link>
                                    </Menu.Item> 
                                )
                            )
                        }
                            <React.Fragment>
                                <hr style={{color: 'white', width: '70%'}} />
                                <Link to='/survey/new'>
                                    <Icon 
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#60c2e6',
                                            margin: '19px',
                                            padding: '15px',
                                            fontSize: '18px',
                                            cursor: 'pointer'
                                        }}
                                        type='plus' 
                                    />
                                </Link>
                            </React.Fragment>
                        </Menu>
                    </Sider>
                    <Content style={{overflow: 'scrollable'}}>
                        <NavBar />
                        <div style={{margin: '40px 70px'}}>
                            <Router />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Container);
