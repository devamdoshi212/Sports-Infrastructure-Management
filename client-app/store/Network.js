import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  ipaddress: "",
  networkstatus: {},
};

const NetworkSlice = createSlice({
  name: "network",
  initialState: initialValues,
  reducers: {
    getip(state, action) {
      state.ipaddress = action.payload;
    },
    getnetworkstatus(state, action) {
      state.networkstatus = action.payload;
    },
  },
});

export const NetworkActions = NetworkSlice.actions;
export default NetworkSlice.reducer;
