import { configureStore } from "@reduxjs/toolkit";
import NetworkReducer from "./Network";
import UserReducer from "./User";
import AthelteReducer from "./Athelte";
import NotificationTokenReducer from "./NotificationToken";
const store = configureStore({
  reducer: {
    network: NetworkReducer,
    user: UserReducer,
    athelte: AthelteReducer,
    notificationtoken: NotificationTokenReducer,
  },
});
export default store;
