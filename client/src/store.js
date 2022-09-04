import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alert';

export default configureStore({
  reducer: {
    alert: alertReducer,
  },
});
