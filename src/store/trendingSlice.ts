import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendingTopics } from '../services/trendingService';

export const fetchTrendingTopics = createAsyncThunk(
  'trending/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const topics = await getTrendingTopics();
      return topics;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    topics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTrendingTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trendingSlice.reducer;

