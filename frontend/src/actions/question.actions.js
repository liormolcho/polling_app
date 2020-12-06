import { questionConstants } from '../constants';
import { questionService } from '../services';

export const questionActions = {
	addQuestion,
	deleteQuestion,
	getQuestion,
	getAll
};

function getQuestion(url) {
	return dispatch => {
		dispatch(request({ url }));

		questionService.getQuestion(url)
			.then(
				question => dispatch(success(question)),
				error => dispatch(failure(error))
			);
	}

	function request(question) { return { type: questionConstants.GET_REQUEST, question } }
	function success(question) { return { type: questionConstants.GET_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.GET_FAILURE, error } }
}

function getAll() {
	return dispatch => {
		dispatch(request());

		questionService.getAll()
			.then(
				questions => dispatch(success(questions)),
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: questionConstants.GETALL_REQUEST } }
	function success(questions) { return { type: questionConstants.GETALL_SUCCESS, questions } }
	function failure(error) { return { type: questionConstants.GETALL_FAILURE, error } }
}

function addQuestion(question, url) {
	return dispatch => {
		dispatch(request({ question, url }));

		questionService.addQuestion(question, url)
			.then(
				question => {
					dispatch(success(question, url))
				},
				error => {
					dispatch(failure(error, url))
				}
			);
	}

	function request(question) { return { type: questionConstants.NEW_QUES_REQUEST, question } }
	function success(question) { return { type: questionConstants.NEW_QUES_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.NEW_QUES_FAILURE, error } }
}

function deleteQuestion(url) {
	return dispatch => {
		dispatch(request({ url }));

		questionService.deleteQuestion(url)
			.then(
				() => {
					dispatch(success(url))
				},
				error => {
					dispatch(failure(error))
				}
			);
	}

	function request(question) { return { type: questionConstants.DEL_QUES_REQUEST, question } }
	function success(question) { return { type: questionConstants.DEL_QUES_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.DEL_QUES_FAILURE, error } }
}