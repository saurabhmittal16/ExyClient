import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Card, Select, DatePicker, Radio, Icon, notification } from 'antd';

import { addSurvey } from '../../actions/surveyActions';
import categories from '../../categories';

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;
let id = 1;

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

class SingleSelection extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        const {isAdmin, user, form} = this.props;
        if (isAdmin) {
            form.setFieldsValue({'approval': 'pre'});
        } else if (!user.canApprove) {
            form.setFieldsValue({'approval': 'submit'});
        } 
    }

    remove = (k) => {
        const { form } = this.props;
        const options = form.getFieldValue('options');

        if (options.length === 2) {
          return;
        }
    
        form.setFieldsValue({
            options: options.filter(key => key !== k),
        });
    }
    
    add = () => {
        const { form } = this.props;
        const options = form.getFieldValue('options');
        const nextoptions = options.concat(++id);
        form.setFieldsValue({
            options: nextoptions,
        });
    }

    disabledStartDate = (startValue) => {
        const endValue = this.props.form.getFieldsValue()['end'];
        if (!startValue || !endValue) {
          return false;
        }

        if (startValue.valueOf() > endValue.valueOf()) {
            // disable if start is greater than end
            return true;
        }

        const now = new Date();
        console.log(now);
        if (startValue.valueOf() > now.valueOf()) {
            // disable if start is before current time date
            return true;
        }
        return false;
    }
    
    disabledEndDate = (endValue) => {
        const startValue = this.props.form.getFieldsValue()['start'];
        if (!endValue || !startValue) {
            return false;
        }
        const now = new Date();
        console.log(now);        
        if (endValue.valueOf() > now.valueOf()) {
            return true;
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
        const { getFieldDecorator, getFieldValue } = this.props.form;
    
        getFieldDecorator('options', { initialValue: [0,1] });
    
        const options = getFieldValue('options');
        const formItems = options.map((k, index) => (
            <div 
                key={index} 
                style={{display: 'flex', justifyContent: 'space-between'}}
            >
                    <FormItem
                        required={true}
                        key={k*100 + 1}
                        style={{width: '30%'}}
                    >
                        {
                            getFieldDecorator(`option_image[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    message: "Upload an image"
                                }],
                            })(
                                <Input name='text' style={{ width: '90%', marginRight: 8 }} />
                            )
                        }
                    </FormItem>
                    <FormItem
                        required={true}
                        key={k}
                        style={{width: '70%'}}
                    >
                        {
                            getFieldDecorator(`option_text[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    message: "Enter text"
                                }],
                            })(
                                <Input name='text' style={{ width: '90%', marginRight: 8 }} />
                            )
                        }
                        {
                            options.length > 2 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={options.length === 2}
                                    onClick={() => this.remove(k)}
                                />
                            ) : null
                        }
                    </FormItem>
            </div>
        ));

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
                                                            (item, index) => <Option key={index} value={item.text}>{item.text}</Option>
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
                                        <FormItem
                                            label="Options"
                                        >
                                            <Col span={21}>
                                                {formItems}
                                            </Col>
                                            <Col 
                                                span={3}
                                            >
                                                <Icon 
                                                    style={{cursor: 'pointer', margin: '50%', fontSize: '20px'}}
                                                    type="plus"
                                                    onClick={this.add}
                                                />
                                            </Col>
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

const WrappedSingleSelection = Form.create()(SingleSelection);

const mapStateToProps = state => ({
    user: state.user.details,
    isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { addSurvey })(WrappedSingleSelection);