import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Icon } from 'antd';

import Loading from '../Loading';
const { Meta } = Card;

const fileteredData = (albums, query) => {
    query = query.toLowerCase();
    const result = albums.filter(
        item => item.text.toLowerCase().includes(query)
    );
    return result;
}

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    render() {
        return (
            <div>
                <div
                    className='search_bar'
                >
                    <Icon type="search" className='search_icon'/>
                    <Input 
                        disabled={!(this.props.user && this.props.user.albums)}
                        onChange={e => this.setState({query: e.target.value})}
                    />
                    <Link to ='/subusers/new'>
                        <Icon type="plus" className='add_icon'/>
                    </Link>
                </div>
                {
                    this.props.user && this.props.user.albums ? (
                        <Row>
                            {
                                fileteredData(this.props.user.albums, this.state.query).map(
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
                                                            margin: '5px',
                                                            padding: '10px'
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
        user: state.user.details    
    }
}

export default connect(mapStateToProps)(Albums);