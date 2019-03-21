import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Card, notification, message } from 'antd';
import ErrorComponent from '../Utils/ErrorComponent';

import { addNewAlbum } from '../../actions/userActions';

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

class NewAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    const res = await this.props.addNewAlbum(values);
                    if (res.status === 200) {
                        notification.open({
                            message: 'Album created',
                            description: 'A new album was added',
                        });
                        this.props.history.push('/albums');
                    } else {
                        message.error('There was some error');
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
                                            { required: true, message: 'Please enter the image' }
                                        ],
                                    })(
                                        <Input />
                                    )
                                }
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                    <Button type="danger" style={{marginLeft: '10px'}} onClick={() => this.props.history.push('/albums')}>Back</Button>
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

const WrappedNewAlbum = Form.create()(NewAlbum);

const mapStateToProps = (state) => ({
    error: state.error
});

export default connect(mapStateToProps, { addNewAlbum })(WrappedNewAlbum);