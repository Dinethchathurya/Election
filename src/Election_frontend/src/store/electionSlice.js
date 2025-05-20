// store/electionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to load elections
export const fetchElections = createAsyncThunk('elections/fetchElections', async () => {
  const response = await fetch('/api/elections'); // Replace with your real API or Motoko endpoint
  const data = await response.json();
  return data;
});

const electionSlice = createSlice({
  name: 'elections',
  initialState: {
    elections: [],
    loading: false,
    error: null,
  },
  reducers: {
    addElection: (state, action) => {
      state.elections.push(action.payload);
    },
    removeElection: (state, action) => {
      state.elections = state.elections.filter(election => election.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchElections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElections.fulfilled, (state, action) => {
        state.elections = action.payload;
        state.loading = false;
      })
      .addCase(fetchElections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addElection, removeElection } = electionSlice.actions;
export default electionSlice.reducer;

