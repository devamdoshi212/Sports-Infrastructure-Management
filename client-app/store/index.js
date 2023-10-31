import { configureStore } from "@reduxjs/toolkit";
import NetworkReducer from "./Network";
import UserReducer from "./User";
const store = configureStore({
  reducer: { network: NetworkReducer, user: UserReducer },
});
export default store;
