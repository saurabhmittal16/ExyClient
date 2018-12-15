import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';

// Login Imports
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthHeaders from '../utils/setAuthHeaders';
import config from '../config';
import { setCurrentUser } from '../actions/authAction';

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
                const response = await axios.post(`${config.server_url}/api/auth/admin/login`, values);
                if (response.status === 200 && response.data.code === 2) {
                    const token = response.data.token;
                    const user = jwtDecode(token);
                    localStorage.setItem('token', token);
                    setAuthHeaders(token);
                    this.props.dispatch(setCurrentUser(user));
                    message.success("Login Successful");
                    this.props.history.push('/');
                }
                else {
                    this.setState({
                        error: response.data.message
                    });
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

export default connect()(WrappedLogin);