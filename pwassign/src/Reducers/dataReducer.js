import {
    ALL_DATA_FAIL,
    ALL_DATA_REQUEST,
    ALL_DATA_SUCCESS,

    ALL_CENTERS_FAIL,
    ALL_CENTERS_REQUEST,
    ALL_CENTERS_SUCCESS,

    ALL_ROOMS_FAIL,
    ALL_ROOMS_REQUEST,
    ALL_ROOMS_SUCCESS
} from "../Constants/dataConstants";

export const getAllDataReducer = (state = { center: "", room: "" }, action) => {
    
    switch (action.type) {

        case ALL_DATA_REQUEST:
            return {
                loading: true,
                ...state,
            };

        case ALL_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }

        case ALL_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const getAllCenterReducer = (state = { centers: [] }, action) => {
    
    switch (action.type) {

        case ALL_CENTERS_REQUEST:
            return {
                loading: true,
                centers: [],
            };

        case ALL_CENTERS_SUCCESS:
            return {
                loading: false,
                centers: action.payload,
            }

        case ALL_CENTERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const getAllRoomReducer = (state = { rooms: [] }, action) => {
    
    switch (action.type) {

        case ALL_ROOMS_REQUEST:
            return {
                loading: true,
                rooms: [],
            };

        case ALL_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload,
            }

        case ALL_ROOMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};