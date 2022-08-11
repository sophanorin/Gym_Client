import {
    ALL_SPECIALIZATIONS_FAIL,
    ALL_SPECIALIZATIONS_REQUEST,
    ALL_SPECIALIZATIONS_SUCCESS,
} from "../constants/specializationsConstants";

const initialState = {
    loading: false,
    error: null,
    specializations: [],
};

export const specializations = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SPECIALIZATIONS_REQUEST: {
            return { ...state, loading: true, error: false };
        }
        case ALL_SPECIALIZATIONS_SUCCESS: {
            const specializations = action.payload;
            return {
                ...state,
                specializations: specializations,
                loading: false,
                error: false,
            };
        }
        case ALL_SPECIALIZATIONS_FAIL: {
            const error = action.payload;
            return { ...state, error };
        }
        default:
            return state;
    }
};
