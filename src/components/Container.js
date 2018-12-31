import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Layout, Menu, Popover, Modal, Button } from 'antd';
import Router from './Router';

import { logout } from '../actions/authAction';
import { getUserDetails } from '../actions/userActions';

const {Content, Sider} = Layout;
const sider = [
    ["dashboard", "/", "Dashboard"],
    ["file-done", "/albums", "Albums"],
    ["wifi", "/", "Surveys"],
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
            <Link to="/survey/pending">
                <Icon type="loading-3-quarters" />Pending Approval
            </Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/survey/ready">
                <Icon type="file-done" />Ready To Publish
            </Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to="/survey/published">
                <Icon type="rocket" />Published
            </Link>
        </Menu.Item>
        <Menu.Item key="5">
            <Link to="/survey/discarded">
                <Icon type="stop" />Discarded
            </Link>
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
        this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
        // console.log("Mounting Container");
        this.props.getUserDetails();
    }

    redirect() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    logout() {
        this.props.logout();
        localStorage.clear();
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
            <div>
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
                                        <div>
                                            <div style={{cursor: 'pointer'}} onClick={this.logout}>
                                                Logout
                                            </div>
                                            <div>
                                                {this.props.email}
                                            </div>
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
                            
                            {
                                this.props.isAdmin ? (
                                    <Menu.Item 
                                        key={4}
                                        title="Sub Users"
                                    >
                                        <Link to='/subusers'>
                                            <Icon type='user' theme="outlined" />
                                        </Link>
                                    </Menu.Item> 
                                ) : null
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
                {
                    this.props.error && this.props.error.statusCode === 401 && (
                        <Modal
                            visible={true}
                            closable={false}
                            footer={[
                                <Button type='primary' onClick={this.redirect}>Ok</Button>
                            ]}
                        >
                            <p>Session expired. You need to login again</p>
                        </Modal>
                    )
                }
            </div>            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.auth.user.email,
        isAuthenticated: state.auth.isAuthenticated,
        isAdmin: state.auth.isAdmin,
        error: state.error.data
    }
};

export default connect(mapStateToProps, {getUserDetails, logout})(Container);