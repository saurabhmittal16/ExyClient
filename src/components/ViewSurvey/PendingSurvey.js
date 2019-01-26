import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Icon } from 'antd';

import Loading from '../Loading';

const fileteredData = (albums, query) => {
    query = query.toLowerCase();
    const result = albums.filter(
        item => item.name.toLowerCase().includes(query)
    );
    return result;
}

const data = [
    {
        question: "What is my name?",
        start: "24 May 2016, 12:40 PM",
        end: "25 May 2016, 2:40 PM",
    },
    {
        question: "What is my age?",
        start: "24 May 2016, 12:40 PM",
        end: "25 May 2016, 2:40 PM",
    },
    {
        question: "What is my favorite color?",
        start: "24 May 2016, 12:40 PM",
        end: "25 May 2016, 2:40 PM",
    },
    {
        question: "What is my favorite food?",
        start: "24 May 2016, 12:40 PM",
        end: "25 May 2016, 2:40 PM",
    },
]

class PendingSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div
                        className='search_bar'
                    >
                        <Icon type="search" className='search_icon'/>
                        <Input 
                            placeholder='Name'
                            // disabled={!(this.props.user && this.props.user.albums)}
                            onChange={e => this.setState({query: e.target.value})}
                        />
                        <Link to ='/survey/new'>
                            <Icon type="plus" className='add_icon'/>
                        </Link>
                    </div>
                </div>
                <div>
                {
                    data.map(
                        (obj, index) => (
                            <div
                                className='survey_card'
                                key={index}
                            >
                                <Row>
                                    <Col span={1}>
                                        <div 
                                            className='survey_image' 
                                        />
                                    </Col>
                                    <Col span={23}>
                                        <div className='survey_body'>
                                            <div className='title'>
                                                {obj.question}
                                            </div>
                                            <div className='sub_title'>
                                                <div className='icons'>
                                                    <span>
                                                        <Icon type='select'/>{1}
                                                    </span>
                                                    <span>
                                                        <Icon type='message'/>{2}
                                                    </span>
                                                    <span>
                                                        <Icon type='like'/>{3}
                                                    </span>
                                                    <span>
                                                        <Icon type='dislike'/>{0}
                                                    </span>
                                                </div>
                                                <div className='dates'>
                                                    <span>
                                                        <Icon type='hourglass'/>
                                                        {obj.start}
                                                    </span>
                                                    <span>
                                                        <Icon type='hourglass'/>
                                                        {obj.start}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    )
                }
                </div>
            </div>
        )
    }
}

export default PendingSurvey;