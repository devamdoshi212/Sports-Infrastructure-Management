import { configureStore } from "@reduxjs/toolkit";
import NetworkReducer from "./Network";
const store = configureStore({
  reducer: { network: NetworkReducer },
});
export default store;
