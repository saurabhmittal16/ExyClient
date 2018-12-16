import React from 'react';
import { Row, Col, Card } from 'antd';

import Selection from './Selection';
import RatingFeedback from './RatingFeedback';

const types = [
    'Single Selection',
    'Multiple Selection',
    'Rating',
    'Feedback'
];

class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.TypeForms = [
            <Selection type='single' onCancel={this.handleCancel}  {...this.props} />,
            <Selection type='multiple' onCancel={this.handleCancel} {...this.props} />,
            <RatingFeedback type='rating' onCancel={this.handleCancel} {...this.props} />,
            <RatingFeedback type='feedback' onCancel={this.handleCancel} {...this.props} />
        ]
    }

    handleCancel = () => this.setState({selected: undefined});

    handleClick = (index) => {
        this.setState({selected: index+1});
    }

    render() {
        return (
            <div>
                {
                    !this.state.selected ? (
                        <Row>
                        {
                            types.map(
                                (item, index) => (
                                    <Col span={6} key={index}>
                                        <Card 
                                            className='type_selection'
                                            onClick={() => this.handleClick(index)}
                                        >
                                            {item}
                                        </Card>
                                    </Col>
                                )
                            )
                        }
                        </Row>
                    ) : (
                        <div>
                            {this.TypeForms[this.state.selected - 1]}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default NewSurvey;