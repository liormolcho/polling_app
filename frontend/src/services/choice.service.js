
export const choiceService = {
	addNewChoice,
	deleteChoice,
	voteForChoice,
	getChoices,
};

function addNewChoice(id, text) {
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify({
			question: id,
			choice_text: text
		}),
		headers: {
        'Content-Type': 'application/json; charset=utf-8'
   		}
	};

	const url = `/api/choices/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function deleteChoice(id) {
	const requestOptions = {
		method: 'DELETE',
	};
	const url = `/api/choices/${id}/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function voteForChoice(id) {
	const requestOptions = {
		method: 'POST',
	};

	const url = `/api/vote/${id}/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getChoices(question_url) {
	const requestOptions = {
		method: 'GET',
	};
	const url = `/api/questions/${question_url}/choices/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}