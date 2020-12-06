import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../actions';
import { choiceActions } from '../actions';
import { history } from '../helpers';

import {
	Button,
	Grid,
	Header,
	Input,
	Segment
} from 'semantic-ui-react';


class SetupPollPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newChoice: '',
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleNewChoice = this.handleNewChoice.bind(this);
	}

	componentDidMount() {
		const { match, dispatch } = this.props;

		dispatch(questionActions.getQuestion(match.params.url));
		dispatch(choiceActions.getChoices(match.params.url));
	}

	handleOnChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleNewChoice(question_id) {
		const { match, dispatch } = this.props;
		const { newChoice } = this.state;

		dispatch(choiceActions.addNewChoice(question_id, newChoice));
		this.setState({ 'newChoice': newChoice });
	}

	CreateUrl() {
		return window.location.href.replace("edit", "polls")
	}

	render() {
		const { question, choices } = this.props;
		const { newChoice } = this.state;

		let data, legend;
		if (choices.items){
			data = choices.items.map((choice) => {
				return {
					label: choice.choice_text
				};
			});
		}

		if (Object.keys(this.refs).length > 0){
			legend = this.refs.chart.getChart();
		}

		return (
			<Grid stackable>
				<Grid.Row centered>
					{question.item &&
						<Header as='h1' color='teal'>
							{question.item.question_text}
						</Header>
					}
				</Grid.Row>
				<Grid.Row>
					<Grid.Column textAlign='center'>
								<Segment>
									<Input
										fluid
										name='newChoice'
										placeholder='New Choice'
										action={
											<Button
											color='teal'
											content='Add'
											onClick={() => this.handleNewChoice(question.item.id)}/>
										}
										value={newChoice}
										onChange={this.handleOnChange}
									/>
								</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered columns={3}>
					<Grid.Column>
						<Header as='h2' color='teal'>Choices are:</Header>

						{choices.items &&
							<Segment.Group>
								{choices.items.map((choice, index) => {
									return <Segment
										key={choice.choice_text}
										className={'poll-item'}
										id={choice.id}
										value={choice.choice_text}
										>
										{choice.choice_text}
									</Segment>
									}
								)}
							</Segment.Group>
						}
					</Grid.Column>
				</Grid.Row>

				<Grid.Row centered columns={3}>
					<Grid.Column>
						<div>
							<Header as='h2' color='teal'>Have your friends vote on this poll: </Header>
						 	<div> {this.CreateUrl()}</div>
						 </div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const { question, choices } = state;
	return {
		question,
		choices,
	}
}

const connectedSetupPollPage = connect(mapStateToProps)(SetupPollPage);
export { connectedSetupPollPage as SetupPollPage };