import {useReducer} from "react";

type AuthInputPayload = {
    field: 'email' | 'password' | 'username',
    value: string,
};

type AuthState = {
    email: string;
    error: string;
    password: string;
    username: string;
    callingApi: boolean;
    form: 'signup' | 'login';
};

type AuthAction =
    | { type: 'callingApi' | 'apiSuccess' | 'toggleForm' }
    | { type: 'apiError', payload: { error: string } }
    | { type: 'input', payload: AuthInputPayload };

export const useAuthForm = (setUser) => {
    const reducer = (state: AuthState, action: AuthAction): AuthState => {
        switch (action.type) {
            case 'input':
                return {...state, [action.payload.field]: action.payload.value};
            case 'callingApi':
                return {...state, callingApi: true, error: ''};
            case 'apiSuccess':
                return {...state, callingApi: false};
            case 'toggleForm':
                return {...state, form: state.form === 'signup' ? 'login' : 'signup'};
            case 'apiError':
                return {...state, callingApi: false, error: action.payload.error};
            default:
                return state;
        }
    }

    const initialState: AuthState = {
        username: '',
        email: '',
        password: '',
        callingApi: false,
        error: '',
        form: 'login'
    };
    const [{
        username,
        email,
        form,
        password,
        callingApi,
        error
    }, dispatch] = useReducer(reducer, initialState);
    const handleInput = (field, value) => dispatch({type: 'input', payload: {field, value}});
    return {
        email,
        username,
        password,
        callingApi,
        error,
        form,
        handleLogin: () => {
            if (!email || !username) {
                dispatch({type: 'apiError', payload: {error: 'Please fill in all the input fields'}});
                return;
            }
            dispatch({type: 'callingApi'});
            //    Implement meteor login here
            setTimeout(() => {
                dispatch({type: 'apiSuccess'});
                setUser({username});
            }, 500);
        },
        handleSignup: () => {
            if (!email || !password || !username) {
                dispatch({type: 'apiError', payload: {error: 'Please fill in all the input fields'}});
                return;
            }
            dispatch({type: 'callingApi'});
            //    Implement meteor login here
            setTimeout(() => {
                dispatch({type: 'apiSuccess'});
                setUser({username});
            }, 500);
        },
        handleUsernameInput: (value) => handleInput('username', value),
        handleEmailInput: (value) => handleInput('email', value),
        handlePasswordInput: (value) => handleInput('password', value),
        toggleFormType: () => dispatch({type: 'toggleForm'}),
    };
};
