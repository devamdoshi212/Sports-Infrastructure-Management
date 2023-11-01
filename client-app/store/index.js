import { configureStore } from "@reduxjs/toolkit";
import NetworkReducer from "./Network";
import UserReducer from "./User";
import AthelteReducer from "./Athelte";
const store = configureStore({
  reducer: {
    network: NetworkReducer,
    user: UserReducer,
    athelte: AthelteReducer,
  },
});
export default store;
