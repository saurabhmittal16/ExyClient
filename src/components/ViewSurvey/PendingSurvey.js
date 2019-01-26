import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Input, Icon } from 'antd';
import { getUnapprovedSurveys } from '../../actions/surveyActions';

import Loading from '../Loading';

// const fileteredData = (albums, query) => {
//     query = query.toLowerCase();
//     const result = albums.filter(
//         item => item.name.toLowerCase().includes(query)
//     );
//     return result;
// }

const readAbleDates = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {hour12: true});
}

class PendingSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            page: 1
        }
    }

    componentWillMount() {
        if (this.props.surveys.length === 0)
            this.props.getUnapprovedSurveys(this.state.page);
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
                            disabled={!this.props.surveys}
                            onChange={e => this.setState({query: e.target.value})}
                        />
                        <Link to ='/survey/new'>
                            <Icon type="plus" className='add_icon'/>
                        </Link>
                    </div>
                </div>
                <div>
                {
                    this.props.surveys.length > 0 ? this.props.surveys.map(
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
                                                        { readAbleDates(obj.start) }
                                                    </span>
                                                    <span>
                                                        <Icon type='hourglass'/>
                                                        { readAbleDates(obj.end) }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    ) : <Loading />
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        surveys: state.survey.unapprovedSurveys,
        pagination: state.survey.pagination
    }
}

export default connect(mapStateToProps, { getUnapprovedSurveys })(PendingSurvey);