export const CHANGE_PAYMENT_TYPE = "CHANGE_PAYMENT_TYPE";

export function changePaymentType(name) {
    return {
        type: CHANGE_PAYMENT_TYPE,
        name
    }
}
