
import * as types from './actionTypes';

export const setUser = (data) => dispatch => {
    dispatch({ type: types.SET_USER, payload: data})
}