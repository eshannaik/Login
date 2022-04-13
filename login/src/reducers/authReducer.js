import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_FAILED} from '../actions/types';

const initState = {
    user:null,
}

export default function authReducer (state = initState, action) {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{
                ...state,
                user:action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                user: null
            }
        case LOGIN_FAILED:
        case REGISTER_FAILED:
            return{
                ...state,
                user:action.payload,
            }
        default:
            return state;
    }
}