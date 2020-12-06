import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../actions';
import { history } from '../helpers';

import { Header, Grid, Segment } from 'semantic-ui-react';

import './HomePage.css';


class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(questionActions.getAll());
	}

	handleQuestionClick(e) {
		let ques_url = e.target.getAttribute('value');
		history.push(`polls/${ques_url}`);
	}

	render() {
		const { questions } = this.props;

		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						Lets Create Polls
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={2}>
					<Grid.Column>
						{questions.items &&
							<Segment.Group>
								{questions.items.map((question, index) =>
									<Segment
										className='poll-item'
										color='teal'
										key={question.url}
										value={question.url}
										onClick={this.handleQuestionClick}
										>
										{question.question_text}
									</Segment>
								)}
							</Segment.Group>
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const { questions } = state;
	return {
		questions
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };