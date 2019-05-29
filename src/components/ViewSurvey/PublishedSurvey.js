import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'antd';

import { getPublishedSurveys, clearSurvey } from '../../actions/surveyActions';
import SurveyCard from './SurveyCard';
import Loading from '../Utils/Loading';
import NoData from '../Utils/NoData';

const fileteredData = (albums, query) => {
    query = query.toLowerCase();
    const result = albums.filter(
        item => item.question.toLowerCase().includes(query)
    );
    return result;
}

class PublishedSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            page: 1
        }
        this.handleMore = this.handleMore.bind(this);
    }

    componentWillMount() {
        this.props.getPublishedSurveys(this.state.page);
    }

    componentWillUnmount() {
        this.props.clearSurvey();
    }

    handleMore() {
        this.setState(
            prevState => ({
                page: prevState.page + 1
            }), 
            () => this.props.getPublishedSurveys(this.state.page)
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
                    this.props.surveys !== null ? (
                        this.props.surveys.length > 0 ? fileteredData(this.props.surveys, this.state.query).map(
                            (obj, index) => (
                                <SurveyCard
                                    key={index}
                                    survey={obj}
                                />
                            )
                        ) : <NoData title='surveys' />
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
    return {
        surveys: state.survey.publishedSurveys,
        pagination: state.survey.publishedPage
    }
}

export default connect(mapStateToProps, { getPublishedSurveys, clearSurvey })(PublishedSurvey);