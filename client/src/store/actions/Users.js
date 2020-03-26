import Users from "../constants/Users";
import {
    get,
    post,
    alertSuccess,
    alertError,
    setTokenInToLocalStorage,
    ACCESS_TOKEN,
    removeTokenInToLocalStorageAndDeleteAuthorization, interceptor, getTokenAndSetIntoHeaders
} from '../helper';

export const checkAuth = (CB) => async (dispatch) => {
    dispatch({type: Users.CHECK_AUTH_API, loading: true, userLoggedIn: false});
    let accessToken = await localStorage.getItem(ACCESS_TOKEN);
    if(accessToken) {
        get('admins/checkAuth')
            .then(({data}) => {
                if (!data.error) {
                    let user = data.data[0];
                    dispatch(loggedInUserUpdate(user));
                    dispatch({type: Users.CHECK_AUTH_API, loading: false, userLoggedIn: true});
                    CB && CB()
                } else {
                    removeTokenInToLocalStorageAndDeleteAuthorization();
                    alertError(data.data[0]);
                    dispatch({type: Users.CHECK_AUTH_API, loading: false, userLoggedIn: false});
                }
            })
            .catch((error) => {
                dispatch({type: Users.CHECK_AUTH_API, loading: false, userLoggedIn: false});
                console.log('error', error)
            });
    } else {
        dispatch({type: Users.CHECK_AUTH_API, loading: false, userLoggedIn: false});
    }
};

export const login = (payload, CB) => (dispatch) => {
    dispatch({type: Users.LOGIN_USER_API, loading: true, userLoggedIn: false});
    post('admins/login', payload)
        .then(({data}) => {
            if (!data.error) {
                let user = data.data[0];
                dispatch({type: Users.LOGIN_USER_API, loading: false, userLoggedIn: true});
                setTokenInToLocalStorage(user.access_token);
                getTokenAndSetIntoHeaders(user.access_token);
                alertSuccess('Successfully Login');
                dispatch(loggedInUserUpdate(user));
                CB && CB();
            } else {
                alertError(data.data[0]);
                dispatch({type: Users.LOGIN_USER_API, loading: false, userLoggedIn: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Users.LOGIN_USER_API, loading: false, userLoggedIn: false});
            console.log('error', error)
        });
};

export const logout = () => (dispatch) =>  {
    dispatch({type: Users.LOGOUT_USER_API});
    removeTokenInToLocalStorageAndDeleteAuthorization();
    alertSuccess('Successfully logout')
};

export const loggedInUserUpdate = (user) => (dispatch) => {
    dispatch({type: Users.SET_LOGGED_IN_USER, user: user});
};

export const getUsers = () => (dispatch) => {
    dispatch({type: Users.GET_USERS_API, loading: true, users: []});
    get('admins/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Users.GET_USERS_API, loading: false, users: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Users.GET_USERS_API, loading: false, users: []});
            }
        })
        .catch((error) => {
            dispatch({type: Users.GET_USERS_API, loading: false, users: []});
            console.log('error', error)
        });
};

export const updateUser = (payload, CB) => (dispatch) => {
    dispatch({type: Users.UPDATE_USER_API, loading: true});
    post('admins/update', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully update user');
                dispatch({type: Users.UPDATE_USER_API, loading: false});
                CB && CB();
            } else {
                 alertError(data.data[0]);
                dispatch({type: Users.UPDATE_USER_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Users.UPDATE_USER_API, loading: false});
            console.log('error', error)
        });
};

export const addUser = (payload, CB) => (dispatch) => {
    dispatch({type: Users.ADD_USER_API, loading: true});
    post('admins/create', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully add user');
                dispatch({type: Users.ADD_USER_API, loading: false});
                CB && CB();
            } else {
                alertError('Something went wrong please try again');
                dispatch({type: Users.ADD_USER_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Users.ADD_USER_API, loading: false});
            console.log('error', error)
        });
};

export const deleteUser = (payload, CB) => (dispatch) => {
    dispatch({type: Users.DELETE_USER_API, loading: true});
    post('admins/remove', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully delete user');
                dispatch({type: Users.DELETE_USER_API, loading: false});
                CB && CB();
            } else {
                alertError(data.data[0]);
                dispatch({type: Users.DELETE_USER_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Users.DELETE_USER_API, loading: false});
            console.log('error', error)
        });
};
