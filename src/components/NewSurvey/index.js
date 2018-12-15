import React from 'react';
import { Row, Col, Card } from 'antd';

import SingleSelection from './SingleSelection';
import MultipleSelection from './MultipleSelection';
import Rating from './Rating';
import Feedback from './Feedback';
import { Button } from 'antd/lib/radio';

const types = [
    'Single Selection',
    'Multiple Selection',
    'Rating',
    'Feedback'
];

const TypeForms = [
    <SingleSelection />,
    <MultipleSelection />,
    <Rating />,
    <Feedback />
]

class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        }
        this.handleClick = this.handleClick.bind(this);
    }

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
                            {TypeForms[this.state.selected - 1]}
                            <Button onClick={() => this.setState({selected: undefined})}>
                                Back
                            </Button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default NewSurvey;