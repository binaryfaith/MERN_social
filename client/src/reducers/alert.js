import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const alertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    alertAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (text) => {
        const id = uuidv4();
        const { msg, type } = text;
        return { payload: { id, msg, type } };
      },
    },
    alertToggled: (state, action) => {
      state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { alertAdded, alertToggled } = alertSlice.actions;
export default alertSlice.reducer;
