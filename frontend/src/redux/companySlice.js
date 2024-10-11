import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    filterCompanies: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setFilterCompanies: (state, action) => {
      state.filterCompanies = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setFilterCompanies } =
  companySlice.actions;
export default companySlice.reducer;
