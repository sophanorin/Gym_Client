import Axios from "../services/axios";
import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants.js";

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const uri = "/authentication/login";
        const body = { username, password };
        const { data } = await Axios.post(uri, body);

        if (data.accessToken) {
            Axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.accessToken}`;
        }
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });
        localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (userInfo) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: userInfo,
    });
    try {
        const uri = "/authentication/registercustomer";

        const { data } = await Axios.post(uri, userInfo);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: userInfo });
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
        localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("user");
    dispatch({ type: USER_SIGNOUT });
};

export const detailUser = (userID) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userID });
    const {
        userSignin: { user },
    } = getState();
    try {
        const uri = `/user/${userID}`;

        const { data } = await Axios.get(uri);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile =
    (userId, userInfo) => async (dispatch, getState) => {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: userInfo });

        try {
            const uri = `/user/${userId}`;

            const { data } = await Axios.put(uri, userInfo);

            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: userInfo });
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
            localStorage.setItem("user", JSON.stringify(userInfo));
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
