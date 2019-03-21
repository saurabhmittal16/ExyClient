import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Card, Select, notification, message } from 'antd';
import ErrorComponent from '../Utils/ErrorComponent';

import { addSubUser } from '../../actions/userActions';

const Option = Select.Option
const FormItem = Form.Item;
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

class NewSubUser extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    const res = await this.props.addSubUser(values);
                    if (res.data.code === 1) {
                        notification.open({
                            message: 'Subuser created',
                            description: 'A new subuser was created',
                        });
                        this.props.history.push('/subusers')
                    } else {
                        message.error(res.data.message);
                    }
                } catch (err) { }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {
                    !_.isEmpty(this.props.error) && <ErrorComponent history={this.props.history}/>
                }
                <Card
                    className='new-form'
                >
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Row>
                            <Col span={16}>
                                <FormItem
                                    label="Name"
                                >
                                {
                                    getFieldDecorator('name', {
                                        rules: [
                                            { required: true, message: 'Please enter the name' }
                                        ],
                                    })(
                                        <Input />
                                    )
                                }
                                </FormItem>
                                <FormItem
                                    label="Image"
                                >
                                {
                                    getFieldDecorator('image', {
                                        rules: [
                                            {required: true, message: 'Please enter the image'}
                                        ],
                                    })(
                                        <Input />
                                    )
                                }
                                </FormItem>
                                <FormItem
                                    label="Email"
                                >
                                {
                                    getFieldDecorator('email', {
                                        rules: [
                                            {required: true, message: 'Please enter the email'},
                                            {type: 'email', message: 'The input is not valid E-mail!'},
                                        ],
                                    })(
                                        <Input type='email' />
                                    )
                                }
                                </FormItem>
                                <FormItem
                                    label="Mobile"
                                >
                                {
                                    getFieldDecorator('mobile', {
                                        rules: [
                                            {required: true, message: 'Please input the Mobile'},
                                            {len: 10, message: 'Enter 10 Digit Mobile Number'}
                                        ],
                                    })(
                                        <Input />
                                    )
                                }
                                </FormItem>
                                <FormItem
                                    label="Password"
                                >
                                    {
                                        getFieldDecorator('password',
                                            {
                                                rules: [
                                                    {required: true, message: 'Please enter the Password'}
                                                ]
                                            })(
                                            <Input />
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    label="Approval Authority"
                                >
                                    {
                                        getFieldDecorator('canApprove',
                                            {
                                                rules: [
                                                    {required: true, message: 'Please give an authority'}
                                                ]
                                            })(
                                            <Select placeholder="Select an Album">
                                                <Option value='true'>Can Approve</Option>
                                                <Option value='false'>Needs Approval</Option>
                                            </Select>                                        
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                    <Button type="danger" style={{marginLeft: '10px'}} onClick={() => this.props.history.push('/subusers')}>Back</Button>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <ImagePlaceholder />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }
}

const WrappedNewSubUser = Form.create()(NewSubUser);
const mapStateToProps = (state) => ({
    error: state.error
})

export default connect(mapStateToProps, { addSubUser })(WrappedNewSubUser);