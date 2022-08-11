import {
    ALL_COACH_FAIL,
    ALL_COACH_SUCCESS,
    ALL_COACH_REQUEST,
    DELETE_COACH_SUCCESS,
    SET_SELECTED_COACH,
    CLEAR_SELECTED_COACH,
} from "../constants/coachContanst";

const initialState = {
    loading: true,
    coachs: [],
    error: null,
    selectedCoach: null,
};

export const coachReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COACH_REQUEST:
            return { loading: true };
        case ALL_COACH_SUCCESS:
            return { loading: false, coachs: action.payload };
        case ALL_COACH_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_COACH_SUCCESS: {
            const deleteCoachId = action.payload;
            const newCoachs = state.coachs.filter(
                (coach) => coach.id !== deleteCoachId
            );
            return { ...state, coachs: newCoachs };
        }

        case SET_SELECTED_COACH: {
            const coach = action.payload;
            return { ...state, selectedCoach: coach };
        }

        case CLEAR_SELECTED_COACH: {
            return { ...state, selectedCoach: null };
        }

        default:
            return state;
    }
};
