import React from 'react';
import { connect } from 'react-redux';
import { getSubUsers } from '../../actions/userActions';

import { Card, Row, Col, Icon } from 'antd';

import Loading from '../Loading';
const { Meta } = Card;

class SubUsers extends React.Component {
    componentWillMount() {
        this.props.getSubUsers();
    }
    render() {
        console.log(this.props.subUsers);
        return (
            <div>
                {
                    this.props.subUsers !== undefined ? (
                        this.props.subUsers.length > 0 ? (
                            <Row>
                                {
                                    this.props.subUsers.map(
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
                                                    cover={
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                        />
                                                    }
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