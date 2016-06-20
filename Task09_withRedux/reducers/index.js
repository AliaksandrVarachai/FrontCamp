import {combineReducers} from 'redux';
import paymentType from './changePaymentType.js';
//import compCover from './changeCompCover.js';
//import resultsTitle from './changeResultsTitle.js';

const rootReducer = combineReducers({
    paymentType,
    //resultsTitle,
    //compCover
});

export default rootReducer;