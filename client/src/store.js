import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alert';
import { registerApi } from './services/registerApi';

export default configureStore({
  reducer: {
    alert: alertReducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerApi.middleware),
});
