import Axios from "../services/axios";
import {
    ALL_SPECIALIZATIONS_FAIL,
    ALL_SPECIALIZATIONS_REQUEST,
    ALL_SPECIALIZATIONS_SUCCESS,
} from "../constants/specializationsConstants";

export const getSpecializations = () => async (dispatch) => {
    dispatch({ type: ALL_SPECIALIZATIONS_REQUEST });
    try {
        const { data } = await Axios.get(`/specialization`);

        dispatch({ type: ALL_SPECIALIZATIONS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ALL_SPECIALIZATIONS_FAIL, payload: error.message });
    }
};
