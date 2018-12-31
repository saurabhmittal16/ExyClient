import React from 'react';
import { Form, Col, Row, Input, Button, message } from 'antd';

import { signup } from '../actions/signupActions';

const FormItem = Form.Item;
const ImagePlaceholder = () => (
    <div
        style={{
            width: '170px',
            height: '170px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '13% 25%',
            border: 'dashed 1px #101010'
        }}
    >
        Placeholder
    </div>
);

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    const res = await signup(values);
                    if (res.data.code === 1) {
                        this.setState({
                            error: undefined
                        });
                        message.success('Signup successful');
                        this.props.history.push('/login');
                    } else {
                        this.setState({
                            error: res.data.message
                        });
                    }
                } catch (err) {
                    this.setState({
                        error: 'There was some problem with the server. Try again later.'
                    })
                }
            }    
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <div className='signup_body'>
                    <div className='signup_form'>
                        <Form
                            onSubmit={this.handleSubmit}
                        >
                            <Row>
                                <Col span={18}>
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
                                                {type: 'email', message: 'The entered email is not valid!'},
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
                                                {len: 10, message: 'Enter 10 digit Mobile number'}
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
                                    <FormItem>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            className="submit_btn"
                                        >
                                            Register
                                        </Button>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <ImagePlaceholder />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedSignup = Form.create()(Signup);

export default WrappedSignup;