import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';
import { getUnapprovedSurveys } from '../../actions/surveyActions';

import SurveyCard from './SurveyCard';
import Loading from '../Loading';

// const fileteredData = (albums, query) => {
//     query = query.toLowerCase();
//     const result = albums.filter(
//         item => item.name.toLowerCase().includes(query)
//     );
//     return result;
// }

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
                            <SurveyCard
                                key={index}
                                survey={obj}
                            />
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