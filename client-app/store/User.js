import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  User: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    getuserRole(state, action) {
      state.User = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
