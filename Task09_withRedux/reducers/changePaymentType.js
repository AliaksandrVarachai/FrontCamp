import {CHANGE_PAYMENT_TYPE} from '../actions/index';

export default function changePaymentType(state = "monthly", action) {
    switch (action.type) {
        case CHANGE_PAYMENT_TYPE:
            return action.name;
        default:
            return state;
    }
}
