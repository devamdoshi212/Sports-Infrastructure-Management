import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  Athelte: [{}],
};

const AthelteSlice = createSlice({
  name: "athelte",
  initialState: initialValues,
  reducers: {
    getAthelte(state, action) {
      state.Athelte = action.payload;
    },
  },
});

export const AthelteActions = AthelteSlice.actions;
export default AthelteSlice.reducer;
