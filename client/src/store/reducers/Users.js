import Users from '../constants/Users';

const initialState = {
    users: [
        {
            name: 'Muhammad Wasif Khanzada',
            email: 'wasif@gmail.com',
            password: 'hello123!',
            role: 'doctor'
        },
        {
            name: 'Muhammad Fasih Khanzada',
            email: 'fasih@gmail.com',
            password: 'hello123!',
            role: 'doctor'
        },
        {
            name: 'Muhammad Asif Khanzada',
            email: 'asif@gmail.com',
            password: 'hello123!',
            role: 'doctor'
        },
        {
            name: 'Muhammad Aeeteb Khanzada',
            email: 'aeeteb@gmail.com',
            password: 'hello123!',
            role: 'doctor'
        },
        {
            name: 'Muhammad Tahir Khanzada',
            email: 'Tahir@gmail.com',
            password: 'hello123!',
            role: 'doctor'
        },
        {
            name: 'Kamal Alam',
            email: 'kamal@gmail.com',
            password: 'hello123!',
            role: 'user'
        },
        {
            name: 'Umar Baig',
            email: 'umar@gmail.com',
            password: 'hello123!',
            role: 'user'
        },
        {
            name: 'Sohail',
            email: 'sohail@gmail.com',
            password: 'hello123!',
            role: 'user'
        },
        {
            name: 'Sajjad',
            email: 'sajjad@gmail.com',
            password: 'hello123!',
            role: 'user'
        },
        {
            name: 'Ahmer',
            email: 'ahmer@gmail.com',
            password: 'hello123!',
            role: 'user'
        },
    ],
    loading: false,
    addUserLoading: false,
    updateLoading: false,
    loginLoading: false,
    user: {},
    checkAuthLoading: false,
    userLoggedIn: false,
    deleteUserLoading: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case Users.CHECK_AUTH_API:
            return {...state, checkAuthLoading: action.loading, userLoggedIn: action.userLoggedIn};

        case Users.LOGIN_USER_API:
            return {...state, loginLoading: action.loading, userLoggedIn: action.userLoggedIn};

        case Users.LOGOUT_USER_API:
            return {...state, userLoggedIn: false, user: {}};

        case Users.SET_LOGGED_IN_USER:
            return {...state, user: action.user};
        case Users.UPDATE_LOGGED_IN_USER:
            return {...state, user: action.user};

        case Users.ADD_USER_API:
            return {...state, addUserLoading: action.loading};

        case Users.DELETE_USER_API:
            return {...state, deleteUserLoading: action.loading};

        case Users.UPDATE_USER_API:
            return {...state, updateLoading: action.loading};

        case Users.GET_USERS_API:
            return {...state, loading: action.loading, users: action.users};

        default:
            return state;
    }
};
