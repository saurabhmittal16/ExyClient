import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Card, Select, DatePicker, Radio, notification } from 'antd';

import { addSurvey } from '../../actions/surveyActions';
import categories from '../../categories';

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

const ImagePlaceholder = () => (
    <div
        style={{
            width: '170px',
            height: '170px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5% 25%',
            border: 'dashed 1px #101010'
        }}
    >
        Placeholder
    </div>
);

const prepareApprovalSelection = (isAdmin, canApprove) => {

    if (isAdmin) {
        // Admin has pre approved
        return (
            <Select placeholder="Approval Policy" disabled>
                <Option value="pre">Pre-Approval</Option>
            </Select>
        )
    } else if (canApprove) {
        // Is not admin but can approve
        return (
            <Select placeholder="Approval Policy">
                <Option value="pre">Pre-Approval</Option>
                <Option value="submit">Submit from Approval</Option>
            </Select>
        );
    } else {
        // Can't approve
        return (
            <Select placeholder="Approval Policy" disabled>
                <Option value="submit">Submit for Approval</Option>
            </Select>
        )
    }
}

class RatingFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {isAdmin, user, form} = this.props;
        if (isAdmin) {
            form.setFieldsValue({'approval': 'pre'});
        } else if (!user.canApprove) {
            form.setFieldsValue({'approval': 'submit'});
        } 
    }

    disabledStartDate = (startValue) => {
        const endValue = this.props.form.getFieldsValue()['end'];
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    
    disabledEndDate = (endValue) => {
        const startValue = this.props.form.getFieldsValue()['start'];
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    await this.props.addSurvey(values, this.props.type);
                    notification.open({
                        message: 'Survey added',
                        description: 'A new survey was added',
                    });
                    this.props.history.push('/');
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }
      
    render() {
        const { getFieldDecorator } = this.props.form;
    
        return (
            <Row>
                <Col span={18}>
                    <Card>
                        <Button 
                            onClick={this.props.onCancel}
                            icon='cross'
                            style={{
                                float: 'right',
                                position: 'relative',
                                zIndex: '99',
                                border: 'none'
                            }}
                        />
                        <Form
                            onSubmit={this.handleSubmit}
                        >
                            <Row>
                                <Col span={16}>
                                    <Row>
                                        <Col span={10}>
                                            <FormItem
                                                label="Album"
                                            >
                                            {
                                                getFieldDecorator('album', {
                                                    rules: [
                                                        { required: true, message: 'Please select an Album' }
                                                    ],
                                                })(
                                                    <Select placeholder="Select an Album">
                                                    {
                                                        this.props.user.albums && this.props.user.albums.map(
                                                            item => <Option key={item.name} value={item.name}>{item.name}</Option>
                                                        )
                                                    }
                                                    </Select>
                                                )
                                            }
                                            </FormItem> 
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <FormItem
                                            label="Question"
                                        >
                                        {
                                            getFieldDecorator('question', {
                                                rules: [
                                                    { required: true, message: 'Please enter the question' }
                                                ],
                                            })(
                                                <Input />
                                            )
                                        }
                                        </FormItem>
                                    </Row>
                                    
                                    <Row>
                                        <FormItem
                                            label="Image"
                                        >
                                        {
                                            getFieldDecorator('image', {
                                                rules: [
                                                    { required: true, message: 'Please enter image link' }
                                                ],
                                            })(
                                                <Input />
                                            )
                                        }
                                        </FormItem>
                                    </Row>


                                    <Row>
                                        <Col span={12}>
                                            <FormItem
                                                label="Start Date"
                                            >
                                            {
                                                getFieldDecorator('start', {
                                                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                                })(
                                                    <DatePicker 
                                                        showTime 
                                                        format="DD-MM-YYYY HH:mm:ss" 
                                                        disabledDate={this.disabledStartDate}
                                                    />
                                                )
                                            }
                                            </FormItem>
                                        </Col>

                                        <Col span={12}>
                                            <FormItem
                                                label="End Date"
                                            >
                                            {
                                                getFieldDecorator('end', {
                                                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                                })(
                                                    <DatePicker 
                                                        showTime 
                                                        format="DD-MM-YYYY HH:mm:ss" 
                                                        disabledDate={this.disabledEndDate}
                                                    />
                                                )
                                            }
                                            </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={10}>
                                            <FormItem
                                                label="Approval Policy"
                                            >
                                            {
                                                getFieldDecorator('approval', {
                                                    rules: [
                                                        { required: true, message: 'Please select approval policy' }
                                                    ],
                                                })(
                                                    prepareApprovalSelection(this.props.isAdmin, this.props.user.canApprove)
                                                )
                                            }
                                            </FormItem> 
                                        </Col>

                                        <Col offset={2} span={10}>
                                            <FormItem
                                                label="Result Policy"
                                            >
                                            {
                                                getFieldDecorator('result', {
                                                    rules: [
                                                        { required: true, message: 'Please select result policy' }
                                                    ],
                                                })(
                                                    <Select placeholder="Result Policy">
                                                        <Option value="red">Red</Option>
                                                        <Option value="green">Green</Option>
                                                        <Option value="blue">Blue</Option>
                                                    </Select>
                                                )
                                            }
                                            </FormItem> 
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={8}>
                                    <ImagePlaceholder />
                                </Col>
                            </Row>

                            <Row>
                                <FormItem
                                    label="Select a Category"
                                >
                                {
                                    getFieldDecorator('category')(
                                        <RadioGroup
                                            style={{width: '100%'}}
                                        >
                                            <Row>
                                            {
                                                categories.map(
                                                    (item, index) => (
                                                        <Col span={8} key={index}>
                                                            <Radio value={item}>
                                                                {item}
                                                            </Radio>
                                                        </Col>
                                                    )
                                                )
                                            }
                                            </Row>
                                        </RadioGroup>
                                    )
                                }
                                </FormItem>
                            </Row>

                            <FormItem>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </FormItem>

                        </Form>
                    </Card>
                </Col>

                <Col 
                    span={6}
                >
                    <div
                        style={{
                            margin: '30px'
                        }}
                    >
                        <div className="mobile">
                            <div className="screen" /> 
                            <div className="content">
                                <p>Hello</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

const WrappedSingleSelection = Form.create()(RatingFeedback);

const mapStateToProps = state => ({
    user: state.user.details,
    isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { addSurvey })(WrappedSingleSelection);