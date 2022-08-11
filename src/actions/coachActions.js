import Axios from "../services/axios";
import {
    ALL_COACH_FAIL,
    ALL_COACH_SUCCESS,
    ALL_COACH_REQUEST,
    DELETE_COACH_SUCCESS,
    DELETE_COACH_ERROR,
    CREATE_COACH_SUCCESS,
    CREATE_COACH_FAIL,
    SET_SELECTED_COACH,
    CLEAR_SELECTED_COACH,
} from "../constants/coachContanst";

export const getCoachs = () => async (dispatch) => {
    dispatch({ type: ALL_COACH_REQUEST });
    try {
        const { data } = await Axios.get(`/user/?type=stuff&role=coach`);

        dispatch({ type: ALL_COACH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_COACH_FAIL, payload: error.message });
    }
};

export const deleteCoach = (userId) => async (dispatch) => {
    try {
        const { data } = await Axios.delete(`/user/${userId}`);

        dispatch({ type: DELETE_COACH_SUCCESS, payload: userId });
    } catch (error) {
        dispatch({ type: DELETE_COACH_ERROR, payload: error.message });
    }
};

export const addCoach = (coach) => async (dispatch) => {
    try {
        const { data } = await Axios.post(
            `/authentication/registerstuff`,
            coach
        );

        dispatch({ type: CREATE_COACH_SUCCESS, payload: coach });
    } catch (error) {
        dispatch({ type: CREATE_COACH_FAIL, payload: error.message });
    }
};

export const setSelectedCoach = (coach) => {
    return (dispatch) => {
        dispatch({ type: SET_SELECTED_COACH, payload: coach });
    };
};

export const clearSelectedCoach = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_SELECTED_COACH });
    };
};

// export const detialProduct = (productId) => async (dispatch) => {
//     dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
//     try {
//         const { data } = await Axios.get(
//             `${process.env.REACT_APP_API_ENDPOINT}/api/products/${productId}`
//         );
//         dispatch({ type: PRODUCT_DETAIL_SECCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_DETAIL_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };
// export const createProduct = () => async (dispatch, getState) => {
//     dispatch({ type: PRODUCT_CREATE_REQUEST });
//     const {
//         userSignin: { user },
//     } = getState();
//     try {
//         const { data } = await Axios.post(
//             `${process.env.REACT_APP_API_ENDPOINT}/api/products`,
//             {},
//             {
//                 headers: { Authorization: `Bearer ${user.token}` },
//             }
//         );
//         dispatch({
//             type: PRODUCT_CREATE_SUCCESS,
//             payload: data.product,
//         });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
//     }
// };
// export const updateProduct = (product) => async (dispatch, getState) => {
//     dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
//     const {
//         userSignin: { user },
//     } = getState();
//     try {
//         const { data } = await Axios.put(
//             `${process.env.REACT_APP_API_ENDPOINT}/api/products/${product._id}`,
//             product,
//             {
//                 headers: { Authorization: `Bearer ${user.token}` },
//             }
//         );
//         dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;

//         dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
//     }
// };
// export const deleteProduct = (productId) => async (dispatch, getState) => {
//     dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
//     const {
//         userSignin: { user },
//     } = getState();
//     try {
//         const { data } = await Axios.delete(
//             `${process.env.REACT_APP_API_ENDPOINT}/api/products/${productId}`,
//             {
//                 headers: { Authorization: `Bearer ${user.token}` },
//             }
//         );
//         dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
//     }
// };

// export const productPerPage = (startIndex, endIndex) => async (dispatch) => {
//     dispatch({ type: PRODUCT_PER_PAGE_REQUEST });
//     try {
//         const { data } = await Axios.get(
//             `${process.env.REACT_APP_API_ENDPOINT}/api/products/limit/${startIndex}&${endIndex}`
//         );
//         dispatch({ type: PRODUCT_PER_PAGE_SECCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: PRODUCT_PER_PAGE_FAIL, payload: error.message });
//     }
// };
