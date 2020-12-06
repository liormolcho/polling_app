import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs';

import { questionActions } from '../actions';
import { choiceActions } from '../actions';

import {
	Button,
	Grid,
	Header,
	Input,
	Segment,
	Label, 
	List
} from 'semantic-ui-react';


class PollPage extends React.Component {

	constructor(props) {
		super(props);

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleVoting = this.handleVoting.bind(this);
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

	handleVoting(e) {

		e.preventDefault();
		const { dispatch } = this.props;

		// retrieve id and votes
		const { id } = e.target;
		const value = e.target.getAttribute('value');

		dispatch(choiceActions.voteForChoice(id));
	}

	render() {
		const { question, choices } = this.props;

		let data, legend;
		if (choices.items){
			data = choices.items.map((choice) => {
				return {
					value: choice.votes,
					label: choice.choice_text
				};
			});
		}

		if (Object.keys(this.refs).length > 0){
			legend = this.refs.chart.getChart();
		}

		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					{question.item &&
						<Header as='h1' color='teal'>
							{question.item.question_text}
						</Header>
					}
				</Grid.Row>
				<Grid.Row centered colums={4}>
					<Header as='h14' color='teal'> notice, you can only vote once!:</Header>
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
										value={choice.votes}
										onClick={this.handleVoting}
										>
										{choice.choice_text}
									</Segment>
									}
								)}
							</Segment.Group>
					}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
						{choices.items &&
						<Grid.Column textAlign='center'>
							<Doughnut ref='chart' data={data} height='400' width='400' />
						</Grid.Column>
					}
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

const connectedPollPage = connect(mapStateToProps)(PollPage);
export { connectedPollPage as PollPage };