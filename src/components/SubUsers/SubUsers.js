import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Icon, Input } from 'antd';

import { getSubUsers } from '../../actions/userActions';
import Loading from '../Utils/Loading';

const { Meta } = Card;

const fileteredData = (subUsers, query) => {
    query = query.toLowerCase();
    const result = subUsers.filter(
        item => item.name.toLowerCase().includes(query)
    );
    return result;
}

class SubUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    componentWillMount() {
        this.props.getSubUsers();
    }
    render() {
        // console.log(this.props.subUsers);
        return (
            <div>
                <div
                    className='search_bar'
                >
                    <Icon type="search" className='search_icon'/>
                    <Input 
                        placeholder='Name'
                        disabled={!(this.props.subUsers !== undefined)}
                        onChange={e => this.setState({query: e.target.value})}
                    />
                    <Link to ='/subusers/new'>
                        <Icon type="plus" className='add_icon'/>
                    </Link>
                </div>
                {
                    this.props.subUsers !== undefined ? (
                        this.props.subUsers.length > 0 ? (
                            <Row>
                                {
                                    fileteredData(this.props.subUsers, this.state.query).map(
                                        (item, index) => (
                                            <Col 
                                                lg={4}
                                                sm={6} 
                                                key={index}
                                                style={{
                                                    margin: '10px'
                                                }}
                                            >
                                                <Card
                                                    style={{
                                                        boxShadow: '0 0px 1px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23)'
                                                    }}
                                                    // cover={
                                                    //     <img 
                                                    //         src={item.image} 
                                                    //         alt={item.name}
                                                    //     />
                                                    // }
                                                >
                                                    <Meta 
                                                        title={item.name}
                                                        description={
                                                            <div>
                                                                <div><Icon type='mail' />&nbsp;&nbsp;{item.email}</div>
                                                                <div><Icon type='phone' />&nbsp;&nbsp;{item.mobile}</div>
                                                            </div>
                                                        }
                                                    />
                                                </Card>
                                            </Col>
                                        )
                                    )
                                }
                            </Row>
                        ) : <div />
                    ) : <Loading />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    subUsers: state.user.subUsers
})


export default connect(mapStateToProps, { getSubUsers })(SubUsers);