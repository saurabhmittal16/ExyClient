import React from 'react';
import { Row, Col, Card } from 'antd';

import SingleSelection from './SingleSelection';
import MultipleSelection from './MultipleSelection';
import Rating from './Rating';
import Feedback from './Feedback';

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
            <SingleSelection onCancel={this.handleCancel}/>,
            <MultipleSelection onCancel={this.handleCancel}/>,
            <Rating onCancel={this.handleCancel}/>,
            <Feedback onCancel={this.handleCancel}/>
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