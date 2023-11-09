import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  complaintType: [],
};

const ComplaintTypeSlice = createSlice({
  name: "complaintType",
  initialState: initialValues,
  reducers: {
    getcomplaintType(state, action) {
      state.complaintType = [...state.complaintType, action.payload];
    },
  },
});

export const ComplaintTypeActions = ComplaintTypeSlice.actions;
export default ComplaintTypeSlice.reducer;
