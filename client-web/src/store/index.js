import { configureStore } from "@reduxjs/toolkit";
import DistrictReducer from "./District";
const store = configureStore({
  reducer: {
    district: DistrictReducer,
  },
});
export default store;
