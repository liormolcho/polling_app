import { combineReducers } from 'redux';

import { question } from './question.reducer';
import { questions } from './questions.reducer';
import { choices } from './choice.reducer';

const rootReducer = combineReducers({
	question,
	questions,
	choices
});

export default rootReducer;