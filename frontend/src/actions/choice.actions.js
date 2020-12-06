import { choiceConstants } from '../constants';
import { choiceService } from '../services';

export const choiceActions = {
	addNewChoice,
	deleteChoice,
	voteForChoice,
	getChoices,
};

function getChoices(url) {
	return dispatch => {
		dispatch(request({ url }));

		choiceService.getChoices(url)
			.then(
				choice => dispatch(success(choice)),
				error => dispatch(failure(error))
			);
	}

	function request(choice) { return { type: choiceConstants.CHOICE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.CHOICE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.CHOICE_FAILURE, error } }
}

function deleteChoice(id) {
	return dispatch => {
		dispatch(request({ id }));

		choiceService.deleteChoice(id)
			.then(
				choice => dispatch(success(choice)),
				error => dispatch(failure(error))
			);
	}

	function request(choice) { return { type: choiceConstants.CHOICE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.CHOICE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.CHOICE_FAILURE, error } }
}

function voteForChoice(id) {
	return dispatch => {
		dispatch(request({ id }));

		choiceService.voteForChoice(id)
			.then(
				choice => {
					dispatch(success(choice))
				},
				error => {
					dispatch(failure(error));
				}
			);
	}

	function request(choice) { return { type: choiceConstants.VOTE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.VOTE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.VOTE_FAILURE, error } }
}

function addNewChoice(ques_id, choice_text){
	return dispatch => {
		dispatch(request({ ques_id }));

		choiceService.addNewChoice(ques_id, choice_text)
			.then(
				choice => {
					dispatch(success(choice))
				},
				error => {
					dispatch(failure(error))
				}
			);
	}

	function request(choice) { return { type: choiceConstants.NEW_CHOICE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.NEW_CHOICE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.NEW_CHOICE_FAILURE, error } }

}