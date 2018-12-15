import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Icon, Layout, Menu, Popover} from 'antd';

const {Content, Sider} = Layout;

const sider = [
    ["dashboard", "/"],
    ["file-done", "/"],
    ["dropbox", "/"],
    ["picture", "/"],
    ["bar-chart", "/"],
    ["eye", "/"]
]

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            data: undefined,
            name: '',
            image: ''
        };
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
                            style={{width: '85px'}}
                        >
                        {
                            sider.map(
                                (item, index) => (
                                    <Menu.Item 
                                        key={index+1}
                                        title={item[0]}
                                    >
                                        <Link to={item[1]}>
                                            <Icon type={item[0]} theme="outlined" />
                                        </Link>
                                    </Menu.Item> 
                                )
                            )
                        }
                        </Menu>
                    </Sider>
                    <Content style={{margin: '20px 20px', overflow: 'scrollable'}}>
                        <h1>Content</h1>
                        <p>{this.props.count}</p>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: 0
    }
};

export default connect(mapStateToProps)(Container);
