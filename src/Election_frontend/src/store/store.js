import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';
import electionSlice from './electionSlice';

const store = configureStore({
  reducer: {
    elections: electionSlice,
    

    // auth: authSlice,
  }
});

export default store;