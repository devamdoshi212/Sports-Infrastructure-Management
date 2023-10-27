import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  user: [{}],
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    getuserdata(state, action) {
      state.user = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
