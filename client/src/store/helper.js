import axios from "axios";
import { message } from 'antd';
message.config({
    duration: 2,
    maxCount: 1,
});
//base url
export const baseUrl = '/api/';

// axios interceptor
export const interceptor = () => {
    axios.defaults.baseURL = baseUrl;
    getTokenAndSetIntoHeaders();
    axios.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        function (response) {
            let e1 = 'jwt must be provided';
            let e2 = 'invalid signature';
            if(response.data && response.data.error && (response.data.data[0] === e1 || response.data.data[0] === e2)) {
                // alertError(response.data.data[0])
            }
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
};

//token key name into localStorage
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

// get token into local storage and set into headers function
export const getTokenAndSetIntoHeaders = async (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        let accessToken = await localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
    }
};

//set token into local storage
export const setTokenInToLocalStorage = async (value) => {
    try {
        await localStorage.setItem(ACCESS_TOKEN, value);
    } catch (error) {
        alertError(JSON.stringify(error))
    }
};

//set token into local storage
export const removeTokenInToLocalStorageAndDeleteAuthorization = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    delete axios.defaults.headers.common['Authorization'];
};

// generate random id function
export const uuid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        return s4();
};

//axios get method
export const get = (url) => {
    return axios.get(url)
};

//axios post method
export const post = (url, data) => {
    return axios.post(url, data)
};
// toasts
//success toast
export const alertSuccess = (text) => {
    message.success(text);
};
//error toast
export const alertError = (text) => {
    message.error(text);
};
//warning toast
export const alertWarning = (text) => {
    message.warning(text);
};
