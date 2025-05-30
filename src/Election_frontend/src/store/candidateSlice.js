import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Election_backend } from 'declarations/Election_backend';

// Thunk to fetch candidate result data
export const fetchCandidateResults = createAsyncThunk(
  'candidates/fetchCandidateResults',
  async () => {
    const electionId = window.localStorage.getItem("electionId") || "cbopz-duaaa-aaaaa-qaaka-cai";
    const result = await Election_backend.getAllResults(electionId);
    return result;
  }
);

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateResults.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.loading = false;
      })
      .addCase(fetchCandidateResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default candidateSlice.reducer;