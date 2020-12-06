export const questionService = {
	addQuestion,
	deleteQuestion,
	getQuestion,
	getAll
};

function addQuestion(question, question_url) {

	const requestOptions = {
		method: 'POST',
		body: JSON.stringify({
			question_text: question,
			url: question_url
		}),
		headers: {
        'Content-Type': 'application/json; charset=utf-8'
   		}
	};

	const url = `/api/questions/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function deleteQuestion(question_url) {
	const requestOptions = {
		method: 'DELETE',
	};
	const url = `/api/${question_url}/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getQuestion(question_url) {
	const requestOptions = {
		method: 'GET',
	};
	const url = `/api/${question_url}/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getAll() {
	const requestOptions = {
		method: 'GET',
	};
	const url = '/api/questions/';

	return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) { 
		return Promise.reject(response.statusText);
	}

	// On delete, server returns 204 and No Content statusText
	if(response.status === 204 && response.statusText === 'No Content'){
		return {};
	}

	return response.json();
}