import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "@/redux/slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  serialize: false,
};

export const RootReducer = combineReducers({
  auth: authReducer,
});

const PersistedReducer = persistReducer(persistConfig, RootReducer);

export default PersistedReducer;
