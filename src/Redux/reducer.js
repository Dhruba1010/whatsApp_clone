import * as types from './actionTypes';

const initState = {
    user: '',
    isAuth: false,
}

export const reducer = (state=initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_USER:
            return {
                ...state,
                user: payload,
                isAuth: true
            }
        

        default:
            return state;
    }
}