import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prepDates: {
    hormoneSelectedDay: null,
    hormonePrepDay1: null,
    hormonePrepDay2: null,
    hormonePrepDay3: null,
    hormonePrepDay4: null,
    hormoneTestDay: null,
    hormoneTestSamplingDate: null,
    metabolicSamplingSelectedDay: null
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
