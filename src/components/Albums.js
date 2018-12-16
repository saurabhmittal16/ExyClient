import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';

import Loading from './Loading';
const { Meta } = Card;

class Albums extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                {
                    !!this.props.user.albums ? (
                        <Row>
                            <h1>Albums</h1>
                            {
                                this.props.user.albums.map(
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
                                                        alt={item.text}
                                                        style={{
                                                            width: '100%',
                                                            height: '225px',
                                                            margin: '5px'
                                                        }}
                                                    />
                                                }
                                            >
                                                <Meta 
                                                    title={item.text}
                                                />
                                            </Card>
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    ) : <Loading />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user    
    }
}

export default connect(mapStateToProps)(Albums);