import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'antd';

import { getApprovedSurveys } from '../../actions/surveyActions';
import SurveyCard from './SurveyCard';
import Loading from '../Loading';

const fileteredData = (albums, query) => {
    query = query.toLowerCase();
    const result = albums.filter(
        item => item.question.toLowerCase().includes(query)
    );
    return result;
}

class ApprovedSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            page: 1
        }
        this.handleMore = this.handleMore.bind(this);
    }

    componentWillMount() {
        this.props.getApprovedSurveys(this.state.page);
    }

    handleMore() {
        this.setState(
            prevState => ({
                page: prevState.page + 1
            }), 
            () => this.props.getApprovedSurveys(this.state.page)
        );
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
                    this.props.surveys.length > 0 ? fileteredData(this.props.surveys, this.state.query).map(
                        (obj, index) => (
                            <SurveyCard
                                key={index}
                                survey={obj}
                            />
                        )
                    ) : <Loading />
                }
                    <div className='more'>
                        <Button 
                            type="default"
                            onClick={this.handleMore}
                            disabled={this.props.pagination.last}
                        >
                            <Icon type="reload" /> More
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.survey);
    return {
        surveys: state.survey.approvedSurveys,
        pagination: state.survey.approvedPage
    }
}

export default connect(mapStateToProps, { getApprovedSurveys })(ApprovedSurvey);