import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

import { login } from '../actions/authAction';

const FormItem = Form.Item;

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                login(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='login-page'>
                <Form 
                    onSubmit={this.handleSubmit.bind(this)} 
                    className="login-form"
                >
                    <FormItem>
                        {
                            getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )
                        }
                    </FormItem>

                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Link className="login-form-forgot" to='/forgot'>Forgot password</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to='/signup'>register now</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedLogin = Form.create()(Login);

export default connect()(WrappedLogin);