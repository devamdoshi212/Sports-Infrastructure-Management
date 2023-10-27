import { configureStore } from "@reduxjs/toolkit";
import DistrictReducer from "./District";
import UserDataReducer from "./UserData";
const store = configureStore({
  reducer: {
    district: DistrictReducer,
    user: UserDataReducer,
  },
});
export default store;
