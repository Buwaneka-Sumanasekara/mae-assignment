import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import Search from './search';

export const rootEpic = combineEpics(
    Search.epics.loadSuggestionsEpic
);


export const rootReducer = combineReducers({ search: Search.searchReducer });
