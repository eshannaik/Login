import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_FAILED} from './types';

export const loggedin = ({Username,Password,msg}) => {
    return{
        type: LOGIN_SUCCESS,
        payload: {Username,Password,msg} 
    }
}

export const loggedin_failed = ({msg}) => {
    return{
        type:LOGIN_FAILED,
        payload: {msg}
    }
}

export const registered = ({Username,Password,Name,msg}) => {
    return{
        type:REGISTER_SUCCESS,
        payload: {Username,Password,Name,msg} 
    }
}

export const registered_failed = ({msg}) => {
    return{
        type:REGISTER_FAILED,
        payload: {msg}
    }
}

export const loggedout = () => {
    return{
        type:LOGOUT_SUCCESS
    }
}