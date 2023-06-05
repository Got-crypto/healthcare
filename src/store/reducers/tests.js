import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prepDates: {
    StandardPackageHormone__PrepDate1: null,
    StandardPackageHormone__PrepDate2: null,
    StandardPackageHormone__PrepDate3: null,
    StandardPackageHormone__PrepDate4: null,
    StandardPackageHormone__reminder1Time: null,
    StandardPackageHormone__reminder2Time: null,
    StandardPackageHormone__testDate1: null,
    StandardPackageHormone__testDate2: null,
    StandardPackageMetabolic__PrepDate1: null,
    StandardPackageMetabolic__PrepDate2: null,
    StandardPackageMetabolic__PrepDate3: null,
    StandardPackageMetabolic__PrepDate4: null,
    StandardPackageMetabolic__reminder1Time: null,
    StandardPackageMetabolic__reminder2Time: null,
    StandardPackageMetabolic__testDate1: null,
    StandardPackageMetabolic__testDate2: null,
    hormoneTestSamplingDate: null,
    metabolicTestDate: null
  },
  hormorneTestComplete: false
};

const tests = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    addPrepDates(state, action) {
      state.prepDates = action.payload;
    },
    setCompleteHormoneTest(state, action) {
      state.hormorneTestComplete = action.payload;
    }
  }
});

export default tests.reducer;

export const { addPrepDates, setCompleteHormoneTest } = tests.actions;
