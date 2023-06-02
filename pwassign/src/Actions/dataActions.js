import axios from "axios"

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

const api = "http://localhost:5000";

// Get All Data
export const getAllData = (center = "", room = "") => async (dispatch) => {
   
  try {
      dispatch({ type: ALL_DATA_REQUEST });
      
      const { data } = await axios.get(api+`/api/v1/getAllData?center=${center}&room=${room}`);
      dispatch({
        type: ALL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DATA_FAIL,
        payload: error.response,
      });
    }
  };

//get all center
export const getAllCenter = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CENTERS_REQUEST });
    const { data } = await axios.get(api+"/api/v1/getAllCenter");
    dispatch({
      type: ALL_CENTERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CENTERS_FAIL,
      payload: error.response.data,
    });
  }
};

// get all rooms
export const getAllRooms = (centerName = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_ROOMS_REQUEST });
    const { data } = await axios.get(api + `/api/v1/getAllRooms?centerName=${centerName}`);

    dispatch({
      type: ALL_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ROOMS_FAIL,
      payload: error.response,
    });
  }
};