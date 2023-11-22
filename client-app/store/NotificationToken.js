import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  token: "",
};

const NotificationSlice = createSlice({
  name: "notificationtoken",
  initialState: initialValues,
  reducers: {
    gettoken(state, action) {
      state.token = action.payload;
    },
  },
});

export const NotificationActions = NotificationSlice.actions;
export default NotificationSlice.reducer;
