import React from 'react';
import { Row, Col, Icon } from 'antd';

const readAbleDates = dateString => {
	const date = new Date(dateString);
	return date.toLocaleString('en-IN', { hour12: true });
};

const SurveyCard = ({ survey }) => (
	<div className="survey_card">
		<Row>
			<Col span={1}>
                <img 
                    className='survey_image' 
                    src={survey.image} 
                    alt={survey.type}
                />
			</Col>
			<Col span={23}>
				<div className="survey_body">
					<div className="title">{survey.question}</div>
					<div className="sub_title">
						{/* <div className='icons'>
                            <span>
                                <Icon type='select'/>{1}
                            </span>
                            <span>
                                <Icon type='message'/>{2}
                            </span>
                            <span>
                                <Icon type='like'/>{3}
                            </span>
                            <span>
                                <Icon type='dislike'/>{0}
                            </span>
                        </div> */}
						<div className="dates">
							<span>
								<Icon type="hourglass" />
								{readAbleDates(survey.start)}
							</span>
							<span>
								<Icon type="hourglass" />
								{readAbleDates(survey.end)}
							</span>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	</div>
);

export default SurveyCard;
