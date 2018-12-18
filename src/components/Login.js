import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';

import { login } from '../actions/authAction';
import { getUserDetails } from '../actions/userActions';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: undefined
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    const res = await this.props.login(values);
                    // console.log(res);
                    if (res.status === 200 && res.data.code === 2) {
                        message.success("Login Successful");
                        this.props.history.push('/');
                    } else if (res.status === 200) {
                        this.setState({
                            error: res.data.message
                        });
                    } else {
                        this.setState({
                            error: 'Internal server error'
                        });
                    }
                } catch (err) {
                    console.log("Internal server error");
                }
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
                                rules: [
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ],
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
                        <p id='error'>
                            {!!this.state.error && this.state.error}
                        </p>
                        Or <Link to='/signup'>register now</Link>
                    </FormItem>
                    
                </Form>
            </div>
        );
    }
}
const WrappedLogin = Form.create()(Login);

export default connect(null, { getUserDetails, login })(WrappedLogin);