import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  districts: [{}],
};

const DistrictSlice = createSlice({
  name: "district",
  initialState: initialValues,
  reducers: {
    getdistrict(state, action) {
      state.districts = [...state.districts, action.payload];
    },
  },
});

export const DistrictActions = DistrictSlice.actions;
export default DistrictSlice.reducer;
