import { configureStore } from "@reduxjs/toolkit";
import DistrictReducer from "./District";
import UserDataReducer from "./UserData";
import ComplaintTypeReducer from "./ComplaintType";
const store = configureStore({
  reducer: {
    district: DistrictReducer,
    user: UserDataReducer,
    complaintType: ComplaintTypeReducer,
  },
});
export default store;
