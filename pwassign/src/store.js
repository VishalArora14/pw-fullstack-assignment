import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllDataReducer, getAllCenterReducer, getAllRoomReducer} from "./Reducers/dataReducer";

const reducer = combineReducers({
    getAllData: getAllDataReducer,
    getAllCenter: getAllCenterReducer,
    getAllRooms: getAllRoomReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;