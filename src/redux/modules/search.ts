import { ofType } from 'redux-observable';
import { throttleTime, mergeMap, map, from, startWith, catchError } from 'rxjs';
import { getAxios } from '../../utils/AxiosUtils';
import { ActionTypes } from '../../constants/ActionTypes';
import { ReducerAction } from '../../types/Common';



const loadSuggestionsValueChanged = (query: string) => ({ type: ActionTypes.SEARCH_VALUE_CHANGED, payload: { value: query } });
const loadSuggestionsSuccess = (data: any) => ({ type: ActionTypes.SEARCH_SUCCESS, payload: data });
const loadSuggestionsFailed = async () => ({ type: ActionTypes.SEARCH_FAILED });
const loadSuggestionsInProgress = () => ({ type: ActionTypes.SEARCHING });

const loadSuggestionsEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionTypes.SEARCH_VALUE_CHANGED),
    throttleTime(1000 as any),
    mergeMap((action: any) => from(getAxios().get(`maps/api/place/autocomplete/json?key=${process.env.REACT_APP_GOOGLE_API_KEY}&input=${action.payload.value}`)).pipe(
        map((response: any) => loadSuggestionsSuccess(response?.predictions || [])),
        catchError((er) => loadSuggestionsFailed())
    )),
    startWith(loadSuggestionsInProgress())
);






//Reducer
const initialState = {
    places: [],
    keywords: [],
    isLoading: false,

}
const searchReducer = (state = initialState, action: ReducerAction) => {
    switch (action.type) {
        case ActionTypes.SEARCH_SUCCESS: {
            return {
                isLoading: false,

            }
        }
        default:
            return state;

    }
}


export default {
    epics: {
        loadSuggestionsEpic
    },
    actions: {
        loadSuggestionsValueChanged
    },
    searchReducer

}












