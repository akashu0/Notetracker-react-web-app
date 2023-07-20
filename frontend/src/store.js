// import { configureStore } from "@reduxjs/toolkit";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import {
  adminCreateReducer,
  adminDeleteReducer,
  adminListReducer,
  adminLoginReducer,
  adminUpdateReducer,
} from "./reducers/adminReducers";

const reducer = combineReducers({
  //this will contain our reducer
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  adminLogin: adminLoginReducer,
  adminList: adminListReducer,
  adminCreate: adminCreateReducer,
  adminUpdate: adminUpdateReducer,
  adminDelete: adminDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

// const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
