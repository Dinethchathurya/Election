import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice';
import electionSlice from './electionSlice';
import candidateSlice from './candidateSlice';

const store = configureStore({
  reducer: {
    elections: electionSlice,
     candidates: candidateSlice,
    

    // auth: authSlice,
  }
});

export default store;