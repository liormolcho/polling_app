import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../actions';
import { history } from '../helpers';

import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react'


class CreatePollsPage extends React.Component {

	// simple page, a header, what page is this
	// create button is on the rightmost side of the header
	// a text box where user enters the question

	constructor(props) {
		super(props);

		this.state = {
			newPoll: '',
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleNewPoll = this.handleNewPoll.bind(this);
	}

	componentDidMount() {
		const { match, dispatch } = this.props;
	}

	handleNewPoll(e) {
		const { dispatch } = this.props;
		const { newPoll }	= this.state;
		let poll_url = Date.now()
		dispatch(questionActions.addQuestion(newPoll, poll_url));
		history.push(`/edit/${poll_url}`);
	}
	
	handleOnChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		const { newPoll } = this.state;
		const { question } = this.props
		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						Create a new poll
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={2}>
					<Grid.Column>
						<Form>
							<TextArea
								autoHeight
								rows={6}
								name='newPoll'
								placeholder='poll name'
								value={newPoll}
								onChange={this.handleOnChange}
							/>
							<Button
								fluid
								color='teal'
								size='medium'
								content='Create poll'
								style={{ marginTop: '0.5em' }}
								onClick={this.handleNewPoll}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const { question } = state;
	return {
		question,
	}
}

const connectedCreatePollsPage = connect()(CreatePollsPage);
export { connectedCreatePollsPage as CreatePollsPage };